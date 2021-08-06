class CreateConcessions < ActiveRecord::Migration[6.1]
  def change
    create_table :concessions do |t|
      t.integer :reception_id
      t.string :name
      t.string :cost
      t.integer :amount
      t.integer :total_cost

      t.timestamps
    end
  end
end
