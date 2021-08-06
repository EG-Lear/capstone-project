class CreateGuestLists < ActiveRecord::Migration[6.1]
  def change
    create_table :guest_lists do |t|
      t.integer :event_id
      t.integer :invited

      t.timestamps
    end
  end
end
