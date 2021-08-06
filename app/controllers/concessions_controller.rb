class ConcessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def create
    concession = Concession.create(concessions_params)
    reception = find_reception
    if concession.valid?
      calculate_reception_cost
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
    cost_value = reception.decorations.sum(:total_cost) + reception.concessions.sum(:total_cost)
    reception.update(total_cost: cost_value)
  end

  def find_reception
    User.find(session[:user_id]).reception
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
