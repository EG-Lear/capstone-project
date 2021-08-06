class DecorationsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def index
    decorations = find_reception.decorations.all
    render json: decorations
  end

  def create
    decoration = Decoration.create(decorations_params)
    reception = find_reception
    if decoration.valid?
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
      reception = find_reception
      render json: reception
    end
  end
  
  def destroy
    decoration = Decoration.find(params[:id])
    decoration.destroy
    reception = find_reception
    render json: reception
  end

  private

  def calculate_reception_cost
    reception = find_reception
    cost_value = reception.decorations.sum(:total_cost) + reception.concession.sum(:total_cost)
  end

  def decorations_params
    defaults = { reception_id: User.find(session[:user_id]).reception.id, total_cost: params[:amount]*params[:cost] }
    params.permit(:name, :cost, :amount).reverse_merge(defaults)
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
