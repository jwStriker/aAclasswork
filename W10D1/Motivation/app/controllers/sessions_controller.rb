class SessionsController < ApplicationController
def new
    @user = User.new
end

def create
    @user = User.find_by_credentials(:user[:username], :user[:password])
    if @user
        login!(@user)
        redirect_to user_url(@user)
    else  
        flash.now[:errors] = ['Invalid username and/or password']
        render :new 
    end
end

def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
end
    
    private
    def user_params
        params.require(:user).permit(:username, :password)
    end
end
