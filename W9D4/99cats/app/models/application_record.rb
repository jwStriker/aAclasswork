class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

end
