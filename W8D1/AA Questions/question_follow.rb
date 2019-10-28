require_relative "questions_database"
require_relative "user"
require_relative "question"

# require_relative "reply"

class QuestionFollow
attr_accessor :id , :user_id , :question_id
    def initialize(hash)
        @id = hash["id"]
        @user_id = hash["user_id"]
        question_id = hash["question_id"]
    end

    def self.followers_for_question_id(question_id)
      data = QuestionsDatabase.instance.execute( <<-SQL , question_id)
        SELECT users.*
        FROM users
        JOIN question_follows ON users.id = question_follows.user_id
        WHERE question_follows.question_id = ?
      SQL
      data.map { |h| User.new(h) }
    end

    def self.followed_questions_for_user_id(user_id)
        data = QuestionsDatabase.instance.execute( <<-SQL , user_id)
        SELECT questions.*
        FROM questions
        JOIN question_follows ON questions.id = question_follows.question_id
        WHERE question_follows.user_id = ?
      SQL
      data.map { |h| Question.new(h) }
    end

    def self.most_followed_questions(n)
         data = QuestionsDatabase.instance.execute( <<-SQL , n)
         SELECT questions.* 
         FROM questions 
         JOIN question_follows ON question_follows.question_id = questions.id
         GROUP BY questions.id 
         ORDER BY count(*) DESC 
         LIMIT ?
         SQL
         data.map { |h| Question.new(h) }
    end
end

