# == Schema Information
#
# Table name: cats
#
#  id          :integer          not null, primary key
#  birth_date  :date             not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Cat < ApplicationRecord
require 'action_view'
require 'action_view/helpers'
include ActionView::Helpers::DateHelper

    CAT_COLORS = ['black', 'white', 'tabby', 'bald'].freeze

    validates :color, inclusion: CAT_COLORS
    validates :sex, inclusion: ['M', 'F']
    validates :birth_date, :name, :sex, :color, presence: true 

    def age
        time_ago_in_words(birth_date)
    end

end
