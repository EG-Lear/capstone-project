class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :total_budget, :venue_capacity, :available_budget, :head_count, :date, :time, :location, :reception, :attendance
end
