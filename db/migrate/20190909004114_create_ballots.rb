class CreateBallots < ActiveRecord::Migration[5.2]
  def change
    create_table :ballots do |t|
      t.integer :first_choice
      t.integer :second_choice
      t.integer :third_choice
      t.timestamps
    end
  end
end
