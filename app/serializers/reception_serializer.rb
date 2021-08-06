class ReceptionSerializer < ActiveModel::Serializer
  attributes :id, :location, :time, :total_cost
end
