class User < ApplicationRecord
    #FGRIPE
    attr_reader :password

    after_initialize :ensure_session_token

    validates :username, :password_digest, :session_token, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}
    validates :session_token, :username, uniqueness: true

    has_many :subs,
        class_name: 'Sub',
        primary_key: :id,
        foreign_key: :moderator_id

    has_many :posts,
        class_name: 'Post',
        primary_key: :id,
        foreign_key: :user_id

    has_many :comments,
        foreign_key: :user_id,
        class_name: :Comment


    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
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
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password 
        self.password_digest = BCrypt::Password.create(password)
    end

    private

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end

end
