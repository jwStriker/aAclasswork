require 'rails_helper'

RSpec.describe User, type: :model do

  subject(:user) do
    User.create!(
      username: "gerald",
      password: "super_secret_password"
    )
  end

  describe "password encryption" do
    it "does not save passwords to the database" do
      User.create!(username: "bojangles1", password: "password1")
      user = User.find_by(username: "bojangles1")
      expect(user.password).not_to be("password1")
    end

    it "encrypts the password using BCrypt" do
      expect(BCrypt::Password).to receive(:create)
      User.new(username: "bojangles1", password: "password1")
    end
  end

  it { should validate_presence_of(:username) }
  it { should validate_uniqueness_of(:username) }
end