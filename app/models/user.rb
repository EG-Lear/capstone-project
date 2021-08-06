class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  has_secure_password

  has_one :event
  has_one :reception, through: :event
end
