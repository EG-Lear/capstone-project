class CreateGuests < ActiveRecord::Migration[6.1]
  def change
    create_table :guests do |t|
      t.string :name
      t.integer :attendance_id
      t.boolean :invited
      t.boolean :bride
      t.boolean :groom
 

      t.timestamps
    end
  end
end
