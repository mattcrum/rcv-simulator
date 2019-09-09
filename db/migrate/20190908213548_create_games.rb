class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :mushroom
      t.integer :supreme
      t.integer :pepperoni
      t.integer :hawaiian
      t.timestamps
    end
  end
end
