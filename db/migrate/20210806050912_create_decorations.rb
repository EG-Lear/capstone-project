class CreateDecorations < ActiveRecord::Migration[6.1]
  def change
    create_table :decorations do |t|
      t.integer :reception_id
      t.string :name
      t.integer :cost
      t.integer :amount
      t.integer :total_cost
      
      t.timestamps
    end
  end
end
