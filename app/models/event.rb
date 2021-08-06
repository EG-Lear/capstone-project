class Event < ApplicationRecord
  validates :name, presence: true
  validates :total_budget, presence: true

  belongs_to :user
  has_one :reception
  has_one :attendance
  has_many :guests, through: :attendance
  # has_many :expenses
end
