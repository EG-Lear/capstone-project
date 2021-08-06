class Event < ApplicationRecord
  validates :name, presence: true
  validates :total_budget, presence: true
  validates :venue_capacity, presence: true

  belongs_to :user
  has_one :reception
  has_one :attendance
  has_many :guests, through: :attendance
end
