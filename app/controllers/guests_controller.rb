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
      render json: { errors: guest.errors.full_messages }
    end
  end

  def update
    guest = Guest.find(params[:id])
    if guest.nil?
      render json: { errors: "Guest not found" }
    else
      guest.update(guests_params)
      calculate_invited
      attendance = find_attendance
      render json: attendance
    end
  end

  def destroy
    guest = Guest.find(params[:id])
    guest.destroy
    calculate_invited
    attendance = find_attendance
    render json: attendance
  end

  private

  def calculate_invited
    attendance = find_attendance
    invited_count = attendance.guests.group(:invited).count.sort_by{|invited, count|}.last[1]
    plus_one_count = attendance.guests.group(:plus_one).count.sort_by{|plus_one, count|}.last[1]
    if attendance.guests.group(:plus_one).count.sort_by{|plus_one, count|}.length == 1
      plus_one_count = 0
    end
    total_count = invited_count + plus_one_count
    puts total_count
    attendance.update(invited: total_count)
  end

  def guests_params
    defaults = { attendance_id: User.find(session[:user_id]).attendance.id, plus_one: false}
    params.permit(:name, :bride, :groom, :invited, :bridesmaid, :groomsmen, :family, :plus_one).reverse_merge(defaults)
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
