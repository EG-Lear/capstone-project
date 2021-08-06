class ConcessionSerializer < ActiveModel::Serializer
  attributes :id, :name, :cost, :total_cost, :amount
end
