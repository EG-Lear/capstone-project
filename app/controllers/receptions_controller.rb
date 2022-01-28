class ReceptionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def index
    reception = find_user.reception
    render json: reception
  end

  def create
    reception = Reception.create(reception_params)
    if reception.valid?
      calculate_reception_cost
      render json: reception, status: :created
    else
      render json: { errors: reception.errors.full_messages }
    end
  end

  def update
    reception = Reception.find(params[:id])
    if reception.nil?  
      render json: { errors: "Reception not found" }
    else
      if reception.valid?
        reception.update(reception_params)
        render json: reception
      else
        render json: { errors: reception.errors.full_messages }
      end
    end
  end

  private

  def reception_params
    defaults = { event_id: User.find(session[:user_id]).event.id }
    params.permit(:time, :total_cost, :location).reverse_merge(defaults)
  end

  def calculate_reception_cost
    reception = find_user.reception
    event = find_user.event
    cost_value = reception.decorations.sum(:total_cost) + reception.concessions.sum(:total_cost)
    reception.update(total_cost: cost_value)
    expenses_cost = event.expenses.sum(:cost)
    event.update(available_budget: event.total_budget - reception.total_cost - expenses_cost)
  end
end
