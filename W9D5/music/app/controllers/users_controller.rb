class UsersController < ApplicationController

    def show
        render :show
    end

    def new
        @user = User.new
        render :new
    end

    def create
    @user = User.new(user_params)
        if @user.save
        flash[:notice] = 'Successfully created your account! Check your inbox for an activation email.'
        redirect_to new_session_url
        else
        flash.now[:errors] = @user.errors.full_messages
        render :new
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password)
    end

end