class CreateGuests < ActiveRecord::Migration[6.1]
  def change
    create_table :guests do |t|
      t.string :name
      t.integer :attendance_id
      t.boolean :plus_one
      t.boolean :invited
      t.boolean :bridesmaid
      t.boolean :groomsmen
      t.boolean :bridge
      t.boolean :groom
      t.boolean :family

      t.timestamps
    end
  end
end
