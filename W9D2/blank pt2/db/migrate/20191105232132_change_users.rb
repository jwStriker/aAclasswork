class ChangeUsers < ActiveRecord::Migration[6.0]
  def change
    change_table :users do |t|
      t.remove :name, :email
      t.string :username, null: false
    end
  end
end
