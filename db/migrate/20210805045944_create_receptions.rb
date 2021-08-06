class CreateReceptions < ActiveRecord::Migration[6.1]
  def change
    create_table :receptions do |t|
      t.time :time
      t.integer :total_cost
      t.integer :event_id
      t.string :location

      t.timestamps
    end
  end
end
