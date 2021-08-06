class Reception < ApplicationRecord
  validates :location, presence: true
  validates :time, presence: true

  belongs_to :event
  has_many :concessions
end
