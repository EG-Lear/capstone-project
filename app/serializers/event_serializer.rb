class EventSerializer < ActiveModel::Serializer
  attributes :name, :budget, :venue_capacity
end
