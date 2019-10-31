# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  text       :string           not null
#  poll_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Question < ApplicationRecord
    validates :text, presence: true

    has_many :answer_choices,
    class_name: 'AnswerChoice',
    primary_key: :id, 
    foreign_key: :question_id

    belongs_to :poll,
    class_name: 'Poll',
    primary_key: :id,
    foreign_key: :poll_id

    has_many :responses,
    through: :answer_choices,
    source: :responses

    def results_n_plus_1
        results = {} 
        self.answer_choices.each do |answer_choice|
            results[answer_choice.text] = answer_choice.responses.count    
        end
        results
    end

    def results_two_query 
        results = {}
        self.answer_choices.includes(:responses).each do |answer_choice|
            results[answer_choice.text] = answer_choice.responses.length
        end
        results
    end

end
