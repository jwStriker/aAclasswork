class ShortenedUrl < ApplicationRecord

    validates :short_url, uniqueness: true
    validates :short_url, :long_url, :submitter, presence: true 

    belongs_to :submitter,
        class_name: 'User',
        primary_key: :id,
        foreign_key: :submitter_id

    has_many :visitors,
        through: :visits,
        source: :user

    has_many :visits,
        class_name: 'Visit',
        primary_key: :id,
        foreign_key: :shortened_url_id


    def self.create_short_url!(user, long_url)
        ShortenedUrl.create!(
            long_url: long_url,
            submitter_id: user.id,
            short_url: ShortenedUrl.random_code
        )
    end

    def self.random_code
        loop do 
            random_url = SecureRandom::urlsafe_base64 
            return random_url unless ShortenedUrl.exists?(short_url: random_url)
        end
    end

    def num_clicks
        visits.count
    end

    def num_uniques
        visits.select('user_id').distinct.count
    end

    def num_recent_uniques
        visits.select('user_id').where('created_at > ?', 10.minutes.ago).distinct.count
    end

    


end
