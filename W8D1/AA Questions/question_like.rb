require_relative "questions_database"
require_relative "user"
require_relative "question"
require_relative "reply"

class QuestionLike

    attr_accessor :id , :user_id , :question_id
    def initialize(hash)
        @id = hash["id"]
        @user_id = hash["user_id"]
        question_id = hash["question_id"]
    end

    def self.likers_for_question_id(question_id)
        data = QuestionsDatabase.instance.execute( <<-SQL , question_id)
            SELECT users.*
            FROM users
            JOIN question_likes ON question_likes.user_id = users.id
            WHERE question_likes.question_id = ?
        SQL
        data.map { |h| User.new(h) }
    end

    def self.num_likes_for_question_id(question_id)
        data = QuestionsDatabase.instance.execute( <<-SQL , question_id)
            SELECT COUNT(*) AS likes
            FROM questions
            JOIN question_likes ON question_likes.question_id = questions.id
            WHERE questions.id = ?
        SQL
    end

    def self.liked_questions_for_user_id(user_id)
        data = QuestionsDatabase.instance.execute( <<-SQL , user_id)
            SELECT questions.*
            FROM questions
            JOIN question_likes ON question_likes.question_id = questions.id
            WHERE question_likes.user_id = ?
        SQL
        data.map { |h| Question.new(h) }
    end

    def self.most_liked_questions(n)
         data = QuestionsDatabase.instance.execute( <<-SQL , n)
         SELECT questions.* 
         FROM questions 
         JOIN question_likes ON question_likes.question_id = questions.id
         GROUP BY questions.id 
         ORDER BY count(*) DESC 
         LIMIT ?
         SQL
         data.map { |h| Question.new(h) }
    end

end