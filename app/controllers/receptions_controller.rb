class ReceptionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def index
    reception = find_user.reception
    render json: reception, include: :event
  end

  def create
    reception = Reception.create(reception_params)
    if reception.valid?
      render json: reception, status: :created
    else
      render json: { errrors: reception.errors.full_messages }
    end
  end

  def update
  end

  private

  def reception_params
    defaults = { event_id: User.find(session[:user_id]).event.id }
    params.permit(:time, :total_cost, :location).reverse_merge(defaults)
  end

  def find_user
    User.find(session[:user_id])
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
