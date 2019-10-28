require_relative "questions_database"
require_relative "user"
require_relative "question"
# require_relative "question_like"
# require_relative "question_follow"

class Reply

    attr_accessor :id, :question_id, :parent_reply_id, :author_id, :body

    def initialize(hash)
        @id = hash['id']
        @question_id = hash['question_id']
        @parent_reply_id = hash['parent_reply_id']
        @author_id = hash['author_id']
        @body = hash['body']
    end

    def self.find_by_id(id)
        data = QuestionsDatabase.instance.execute( <<-SQL , id)
        SELECT * 
        FROM replies
        WHERE id = ?
        SQL
        data.map {|h| Reply.new(h)}
    end 

    def self.find_by_user_id(user_id)
        data = QuestionsDatabase.instance.execute( <<-SQL , user_id)
        SELECT *
        FROM replies
        WHERE author_id = ?
        SQL
        data.map { |h| Reply.new(h) }
    end

    def self.find_by_question_id(question_id)
        data = QuestionsDatabase.instance.execute( <<-SQL , question_id)
        SELECT *
        FROM replies
        WHERE question_id = ?
        SQL
        data.map { |h| Reply.new(h) }
    end

    def self.find_by_parent_id(parent_id)
        data = QuestionsDatabase.instance.execute( <<-SQL , parent_id)
        SELECT *
        FROM replies
        WHERE parent_reply_id = ?
        SQL
        data.map { |h| Reply.new(h) }
    end

    def author
        User.find_by_id(author_id)
    end 

    def question 
        Question.find(question_id)
    end

    def parent_reply 
        Reply.find_by_id(parent_reply_id)
    end

    def child_reply
        Reply.find_by_parent_id(id)
    end

    def save
        if @id 
          data = QuestionsDatabase.instance.execute( <<-SQL, question_id, parent_reply_id, author_id, body, id)
          UPDATE replies
          SET question_id = ? , parent_reply_id = ? , author_id = ? , body = ?
          WHERE replies.id = ?
          SQL
        else 
          data = QuestionsDatabase.instance.execute( <<-SQL, question_id, parent_reply_id, author_id, body)
          INSERT INTO replies
          (question_id, parent_reply_id, author_id, body)
          VALUES 
          ( ? , ? , ? , ? )
          SQL
          @id = QuestionsDatabase.instance.last_insert_row_id
        end 
    self
    end

end

