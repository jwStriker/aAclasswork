class PostSub < ApplicationRecord
    # validates :sub_id, :user_id, presence: true

    belongs_to :post 
    belongs_to :sub
end
