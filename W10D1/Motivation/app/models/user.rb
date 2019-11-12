class User < ApplicationRecord
    validates :session_token, :password_digest, presence: true
    validates :username, uniqueness: true, presence: true
    validates :password, length: { minimum: 6, allow_nil: true}
    attr_reader :password
    before_validation :ensure_session_token
    
    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    
    def self.generate_session_token
        token = SecureRandom::urlsafe_base64
        while User.exists?(session_token: token)
            token = SecureRandom::urlsafe_base64
        end
        token
    end
    
    def reset_session_token!
        self.session_token = self.class.generate_session_token
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

    private
    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end
    
end
