# == Schema Information
#
# Table name: responses
#
#  id               :integer          not null, primary key
#  answer_choice_id :integer          not null
#  responder_id     :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Response < ApplicationRecord
    validate :not_duplicate_response

    validate :is_not_poll_author

    belongs_to :answer_choice,
    class_name: 'AnswerChoice',
    primary_key: :id,
    foreign_key: :answer_choice_id

    belongs_to :respondent,
    class_name: 'User',
    primary_key: :id, 
    foreign_key: :responder_id

    has_one :question,
    through: :answer_choice,
    source: :question

    def sibling_responses
        self.question.responses.where.not(id: self.id)
    end

    def respondent_already_answered?
        sibling_responses.exists?(responder_id: self.responder_id)
    end

    def not_duplicate_response
        raise "Can't respond twice!" if respondent_already_answered?
    end

    def is_not_poll_author

        poll_author_id = self.answer_choice.question.poll.author_id

        raise "Can't respond to your own poll!" if poll_author_id == self.responder_id


    end

end
