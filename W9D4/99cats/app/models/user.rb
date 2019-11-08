require 'action_view'
require 'bcrypt'

class User < ApplicationRecord
    include ActionView::Helpers::DateHelper

    validates :user_name, :password_digest, presence: true
    #validates :rental_requests

    after_initialize :ensure_session_token

    attr_reader :password

    has_many :cats
    has_many :rental_requests,
        through: :cats,
        source: :rental_requests


    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64(16)
        self.save!
        self.session_token
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.find_by_credentials(user_name, password)
        user = User.find_by(user_name: user_name)
        return nil if user.nil?
        user.is_password?(password) ? user : nil
    end
    
end