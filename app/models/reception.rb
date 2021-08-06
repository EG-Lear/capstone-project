class Reception < ApplicationRecord
  validates :location, presence: true
  validates :time, presence: true, format: { with:  /\A(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\Z/, message: "please enter time in HH:MM format"}

  belongs_to :event
  has_many :concessions
  has_many :decorations
end
