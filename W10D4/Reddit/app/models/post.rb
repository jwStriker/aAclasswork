class Post < ApplicationRecord
    validates :title, presence: true

    belongs_to :author,
        foreign_key: :user_id,
        class_name: :User,
        primary_key: :id

    has_many :post_subs,
        foreign_key: :post_id,
        class_name: :PostSub,
        primary_key: :id,
        inverse_of: :post

    has_many :subs,
        through: :post_subs,
        source: :sub

    has_many :comments, inverse_of: :post
end
