class Event < ApplicationRecord
  validates :name, presence: true
  validates :total_budget, presence: true
  # validates :time, format: { with:  /\A(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\Z/, message: "please enter time in HH:MM format" }

  belongs_to :user
  has_one :reception
  has_one :attendance
  has_many :guests, through: :attendance
end
