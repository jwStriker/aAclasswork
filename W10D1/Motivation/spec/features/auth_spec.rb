require 'rails_helper'

feature 'the signup process' do
  scenario 'has a new user page' do
    visit new_user_url
    expect(page).to have_content "Sign up"
  end

  feature 'signing up a user' do

    scenario 'shows username on the homepage after signup' do 
        # sign_up_as('Alfie')
        visit new_user_url
        fill_in "Username", with: 'Alfie'
        fill_in "Password", with: "password"
        click_button "Sign up"
        expect(page).to have_content "Welcome Alfie"
    end

  end
end

feature 'logging in' do
  scenario 'shows username on the homepage after login'

end

feature 'logging out' do
  scenario 'begins with a logged out state'

  scenario 'doesn\'t show username on the homepage after logout'

end