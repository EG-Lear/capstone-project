class Decoration < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :reception_id }
  validates :cost, presence: true
  validates :amount, presence: true

  belongs_to :reception
end
