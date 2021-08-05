class CreateReceptions < ActiveRecord::Migration[6.1]
  def change
    create_table :receptions do |t|

      t.timestamps
    end
  end
end
