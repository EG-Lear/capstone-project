class Expense < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :event_id }
  validates :cost, presence: true
  validates :description, presence: true
  
  belongs_to :event
end
