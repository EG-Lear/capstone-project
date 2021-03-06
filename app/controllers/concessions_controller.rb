class ConcessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def create
    concession = Concession.create(concessions_params)
    if concession.valid?
      calculate_reception_cost
      reception = find_reception
      render json: reception, status: :created
    else
      render json: { errors: concession.errors.full_messages }
    end
  end

  def update
    concession = Concession.find(params[:id])
    if concession.nil?
      render json: { errors: "Concession not found" }
    else
      concession.update(concessions_params)
      calculate_reception_cost
      reception = find_reception
      render json: reception
    end
  end

  def destroy
    concession = Concession.find(params[:id])
    concession.destroy
    calculate_reception_cost
    reception = find_reception
    render json: reception
  end

  private

  def concessions_params
    defaults = { reception_id: User.find(session[:user_id]).reception.id, total_cost: params[:amount]*params[:cost] }
    params.permit(:name, :cost, :amount).reverse_merge(defaults)
  end

  def calculate_reception_cost
    reception = find_reception
    event = find_user.event
    cost_value = reception.decorations.sum(:total_cost) + reception.concessions.sum(:total_cost)
    reception.update(total_cost: cost_value)
    expenses_cost = event.expenses.sum(:cost)
    event.update(available_budget: event.total_budget - reception.total_cost - expenses_cost)
  end
end
