class Guest < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :guest_list_id }
  
  belongs_to :attendance
end
