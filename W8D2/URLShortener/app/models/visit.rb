class Visit < ApplicationRecord

    validates :visitor, :shortened_url, presence: true

    def self.record_visit!(user, shortened_url)
        Visit.create!(user_id: user.id, shortened_url_id: shortened_url.id)
    end

    belongs_to :shortened_url,
        class_name: 'ShortenedUrl',
        foreign_key: :shortened_url_id,
        primary_key: :id

    belongs_to :visitor,
        class_name: 'User',
        foreign_key: :user_id,
        primary_key: :id


end