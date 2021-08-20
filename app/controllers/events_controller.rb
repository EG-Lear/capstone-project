class EventsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def show
  end
  
  def index
    event = find_user.event
    render json: event
  end
  
  def create
    event = Event.create(event_params)
    # byebug
    if event.valid?
      render json: event, status: :created
    else
      render json: { errors: event.errors.full_messages }
    end
  end

  def update
    event = Event.find(params[:id])
    if event.nil?
      render json: { errors: "Event not found" }
    else
      event.update(update_params)
      render json: event
    end
  end

  private

  def event_params
    defaults = { user_id: session[:user_id], available_budget: params[:total_budget]}
    params.permit(:name, :total_budget, :date, :venue_capacity).reverse_merge(defaults)
  end

  def update_params
    params.permit(:name, :total_budget, :date, :venue_capacity, :time, :location)
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
