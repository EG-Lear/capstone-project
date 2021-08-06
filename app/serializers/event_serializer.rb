class EventSerializer < ActiveModel::Serializer
  attributes :name, :total_budget, :venue_capacity, :available_budget, :head_count, :date, :location, :reception, :guest_list
end
