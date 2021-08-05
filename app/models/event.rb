class Event < ApplicationRecord
  validates :name, presence: true
  validates :total_budget, presence: true

  belongs_to :user
  # has_many :guests
  # has_many :expenses
end
