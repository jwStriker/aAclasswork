class SessionsController < ApplicationController

    before_action :already_logged_in, only: %i(create new)

    def new
        render :new
    end

    def create
        user = User.find_by_credentials(
            params[:user][:user_name],
            params[:user][:password]
        )

        if user.nil?
            flash[:errors] = ["Wrong username and/or password."]
            render :new
        else
            login!(user)
            flash[:notice] = ["Successfully logged in!"]
            redirect_to cats_url
        end    
    end
     
    def destroy
        logout!
        redirect_to new_session_url
    end

end