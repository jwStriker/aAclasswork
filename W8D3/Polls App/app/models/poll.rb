# == Schema Information
#
# Table name: polls
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Poll < ApplicationRecord
    validates :title, uniqueness: true, presence: true

    belongs_to :author,
    class_name: 'User',
    primary_key: :id,
    foreign_key: :author_id

    has_many :questions,
    class_name: 'Question',
    primary_key: :id,
    foreign_key: :poll_id

end
