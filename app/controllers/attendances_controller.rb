class AttendancesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def index
    attendance = User.find(session[:user_id]).attendance
    render json: attendance
  end

  def create
    attendance = Attendance.create(attendance_params)
    if attendance.valid?
      render json: attendance, status: :created
    else
      render json: { errors: attendance.errors.full_messages }
    end
  end

  private

  def attendance_params
    defaults = { event_id: User.find(session[:user_id]).event.id, invited: 0}
    params.permit().reverse_merge(defaults)
  end
end
