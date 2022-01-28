class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  private

  def find_user
    User.find(session[:user_id])
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
