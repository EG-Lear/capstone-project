class ReceptionSerializer < ActiveModel::Serializer
  attributes :id, :location, :time, :total_cost, :decorations, :concessions, :event
end
