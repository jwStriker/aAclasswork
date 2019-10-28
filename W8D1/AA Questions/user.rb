require_relative "questions_database"
require_relative "question"
require_relative "question_follow"
require_relative "reply"
require_relative "question_like"

class User
attr_accessor :id , :fname , :lname
    def initialize(hash)
        @id = hash['id']
        @fname = hash['fname']
        @lname = hash['lname']
    end

    def self.find_by_id(id)
        data = QuestionsDatabase.instance.execute( <<-SQL , id)
        SELECT * 
        FROM users 
        WHERE users.id = ?
        SQL
        data.map { |h| User.new(h) }
    end

    def self.find_by_name(fname, lname)
        data = QuestionsDatabase.instance.execute( <<-SQL , fname, lname)
        SELECT * FROM users 
        where users.fname = ? AND users.lname = ? 
        SQL
        data.map { |h| User.new(h) }
    end

    def authored_questions
      Question.find_by_author_id(id)
    end 

    def authored_replies
      Reply.find_by_user_id(id)
    end 

    def followed_questions
        QuestionFollow.followed_questions_for_user_id(id)
    end

    def liked_questions
        QuestionLike.liked_questions_for_user_id(id)
    end

    def average_karma
       data = QuestionsDatabase.instance.execute( <<-SQL, id )
        SELECT AVG(likes) AS avg_karma
        FROM (
            SELECT COUNT(question_likes.user_id) AS likes
            FROM questions
            LEFT OUTER JOIN question_likes ON question_likes.question_id = questions.id
            WHERE questions.author_id = ?
            GROUP BY questions.id
        )
       SQL
    end

    def save
        if @id 
          data = QuestionsDatabase.instance.execute( <<-SQL, fname, lname, id)
          UPDATE users 
          SET fname = ? , lname = ?
          WHERE users.id = ?
          SQL
        else 
          data = QuestionsDatabase.instance.execute( <<-SQL, fname, lname)
          INSERT INTO users 
          (fname,lname)
          VALUES 
          ( ? , ? )
          SQL
          @id = QuestionsDatabase.instance.last_insert_row_id
        end 
    self
    end
   
end
