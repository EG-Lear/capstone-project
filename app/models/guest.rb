class Guest < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :attendance_id }
  
  belongs_to :attendance
end
