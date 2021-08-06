class ReceptionSerializer < ActiveModel::Serializer
  attributes :id, :location, :time, :date, :total_cost
end
