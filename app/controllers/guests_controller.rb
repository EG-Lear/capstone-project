class GuestsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize


  def create
    guest = Guest.create(guests_params)
    if guest.valid?
      calculate_invited
      attendance = find_attendance
      render json: attendance, status: :created
    else
      render json: { errors: attendance.errors.full_messages }
    end
  end

  def update
    calculate_invited
  end

  def destroy
    calculate_invited
  end

  private

  def calculate_invited
    attendance = find_attendance
    invited_count = attendance.guests.group(:invited).count.sort_by{|invited, count|}.last[1]
    attendance.update(invited: invited_count)
  end

  def guests_params
    defaults = { attendance_id: User.find(session[:user_id]).attendance.id, invited: true, plus_one: false}
    params.permit(:name, :bride, :groom, :family, :bridesmaid, :groomsmen).reverse_merge(defaults)
  end
  
  def find_attendance
    User.find(session[:user_id]).attendance
  end

  def record_not_found
    render json: { errors: "User not logged in" }, status: :unauthorized
  end

  def authorize
    return render json: { errors: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
end
