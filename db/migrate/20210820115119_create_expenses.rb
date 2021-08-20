class CreateExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :expenses do |t|
      t.integer :event_id
      t.integer :cost
      t.string :description
      t.string :name

      t.timestamps
    end
  end
end
