class Event < ApplicationRecord
  validates :name, presence: true
  validates :total_budget, presence: true

  belongs_to :user
  has_one :reception
  # has_one :guest_list
  # has_many :guests, through: :guest_list
  # has_many :expenses
end
