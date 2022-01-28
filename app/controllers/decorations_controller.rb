class DecorationsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def create
    decoration = Decoration.create(decorations_params)
    if decoration.valid?
      calculate_reception_cost
      reception = find_reception
      render json: reception, status: :created
    else
      render json: { errors: decoration.errors.full_messages }
    end
  end

  def update
    decoration = Decoration.find(params[:id])
    if decoration.nil?
      render json: { errors: "Decoration not found" }
    else
      decoration.update(decorations_params)
      calculate_reception_cost
      reception = find_reception
      render json: reception
    end
  end
  
  def destroy
    decoration = Decoration.find(params[:id])
    decoration.destroy
    calculate_reception_cost
    reception = find_reception
    render json: reception
  end

  private

  def calculate_reception_cost
    reception = find_reception
    event = find_user.event
    cost_value = reception.decorations.sum(:total_cost) + reception.concessions.sum(:total_cost)
    reception.update(total_cost: cost_value)
    expenses_cost = event.expenses.sum(:cost)
    event.update(available_budget: event.total_budget - reception.total_cost - expenses_cost)
  end

  def decorations_params
    defaults = { reception_id: User.find(session[:user_id]).reception.id, total_cost: params[:amount]*params[:cost] }
    params.permit(:name, :cost, :amount).reverse_merge(defaults)
  end
end
