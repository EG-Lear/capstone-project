class Reception < ApplicationRecord
  belongs_to :event
  has_many :concessions
end
