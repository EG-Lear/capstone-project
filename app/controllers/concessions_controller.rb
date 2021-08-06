class ConcessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def create
    concession = Concession.create(concessions_params)
    reception = find_reception
    if concession.valid?
      render json: reception, status: :created
    else
      render json: { errors: concession.errors.full_messages }
    end
  end

  def update
    concession = Concession.find(params[:id])
    if concession.nil?
      render json: { errors: "Decoration not found" }
    else
      concession.update(concessions_params)
      reception = find_reception
      render json: reception
    end
  end

  def destroy
    concession = Concession.find(params[:id])
    concession.destroy
    reception = find_reception
    render json: reception
  end

  private

  def concessions_params
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
