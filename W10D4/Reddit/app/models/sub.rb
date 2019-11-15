class Sub < ApplicationRecord
    validates :title, presence: true, uniqueness: true
    validates :moderator_id, presence: true

    belongs_to :moderator,
        foreign_key: :moderator_id,
        class_name: :User,
        primary_key: :id

       has_many :post_subs,
        foreign_key: :sub_id,
        class_name: :PostSub,
        primary_key: :id

    has_many :posts,
        through: :post_subs,
        source: :post
end
