class ExpensesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorize

  def index
    expenses = find_expenses
    render json: expenses
  end

  def create
    expense = Expense.create(expenses_params)
    expenses = find_expenses
    if expense.valid?
      # calculate_expenses_cost
      render json: expenses, status: :created
    else
      render json: { errors: expense.errors.full_messages }
    end
  end

  def update
    expense = expense.find(params[:id])
    expenses = find_expenses
    if expense.nil?
      render json: { errors: "Expense not found" }
    else
      expense.update(expenses_params)
      render json: expenses
    end
  end

  def destroy
    expense = Expense.find(params[:id])
    expense.destroy
    # calculate_expenses_cost
    expenses = find_expenses
    render json: expenses
  end

  private

  def find_expenses
    find_user.event.expenses
  end

  def expenses_params
    defaults = { event_id: User.find(session[:user_id]).event.id }
    params.permit(:name, :cost, :description).reverse_merge(defaults)
  end

  def calculate_expenses_cost
    reception = find_user.reception
    event = find_user.event
    event.update(available_budget: event.total_budget - reception.total_cost)
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
