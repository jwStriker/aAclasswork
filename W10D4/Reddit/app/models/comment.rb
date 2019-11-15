class Comment < ApplicationRecord
    validates :content, presence: true

    belongs_to :post, inverse_of: :comments

    belongs_to :author,
        foreign_key: :user_id,
        class_name: :User
end
