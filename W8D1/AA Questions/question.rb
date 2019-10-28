require_relative "questions_database"

require_relative "question_follow"
require_relative "user"
require_relative "reply"
# require_relative "question_like"

# require 'byebug'

class Question

    attr_accessor :id, :author_id, :title, :body

    def initialize(hash)
        @id = hash['id']
        @title = hash['title']
        @body = hash['body']
        @author_id = hash['author_id']
    end

    def self.find_by_id(id)
        data = QuestionsDatabase.instance.execute( <<-SQL , id)
        SELECT * 
        FROM questions
        WHERE id = ?
        SQL
        data.map {|h| Question.new(h)}
    end 

    def self.find_by_author_id(author_id)
        data = QuestionsDatabase.instance.execute( <<-SQL , author_id)
        SELECT * 
        FROM questions
        WHERE author_id = ?
        SQL
        data.map {|h| Question.new(h)}
    end 

    def author
      User.find_by_id(author_id)
    end 

    def replies 
      Reply.find_by_question_id(id)
    end 

    def followers
        QuestionFollow.followers_for_question_id(id)
    end
    
    def self.most_followed(n)
        QuestionFollow.most_followed_questions(n)
    end

    def self.most_liked(n)
        QuestionLike.most_liked_questions(n)
    end

    def likers
        QuestionLike.likers_for_question_id(id)
    end

    def num_likes
        QuestionLike.num_likes_for_question_id(id)
    end

    def save
        if @id 
          data = QuestionsDatabase.instance.execute( <<-SQL, title, body, author_id, id)
          UPDATE questions 
          SET title = ? , body = ? , author_id = ?
          WHERE questions.id = ?
          SQL
        else 
          data = QuestionsDatabase.instance.execute( <<-SQL, title, body, author_id)
          INSERT INTO questions 
          (title, body, author_id)
          VALUES 
          ( ? , ? , ? )
          SQL
          @id = QuestionsDatabase.instance.last_insert_row_id
        end 
    self
    end

end
