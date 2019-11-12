class ApplicationController < ActionController::Base

    helper_method :current_user

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login!(user)
        @current_user = user
        session[:session_token] = user.reset_session_token!
    end

    def require_current_user!
        redirect_to new_user_url unless current_user 
    end

    def require_no_current_user!
        redirect_to root_url if current_user
    end

    def logout!
        current_user.try(:reset_session_token!)
        session[:session_token] = nil
    end

end
