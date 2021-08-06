class AttendanceSerializer < ActiveModel::Serializer
  attributes :id, :invited, :guests
end
