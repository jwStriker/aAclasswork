class User
    validates :username, presence: true, uniqueness: true
end