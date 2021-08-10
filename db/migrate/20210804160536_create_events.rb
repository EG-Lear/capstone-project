class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :name
      t.integer :total_budget
      t.integer :available_budget
      t.integer :venue_capacity
      t.integer :head_count
      t.string :location
      t.string :date
      t.string :time
      t.integer :user_id

      t.timestamps
    end
  end
end
