class AddRoundToBallots < ActiveRecord::Migration[5.2]
  def change
    add_column :ballots, :round_id, :integer
  end
end
