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
    available = find_user.event.available_budget
    if params[:total_budget].nil?
      # do nothing
    elsif params[:total_budget] > Event.find(params[:id]).total_budget
      increase = params[:total_budget] - Event.find(params[:id]).total_budget
      budget = available + increase
    elsif params[:total_budget] < Event.find(params[:id]).total_budget
      decrease = Event.find(params[:id]).total_budget - params[:total_budget]
      budget = available - decrease
    else
      budget = available
    end
    defaults = { available_budget: budget}
    params.permit(:name, :total_budget, :date, :venue_capacity, :time, :location).reverse_merge(defaults)
  end
end
