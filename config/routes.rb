Rails.application.routes.draw do

  resources :users, only: [:show]
  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy" 
  post "/login", to: "sessions#create"

  resources :events, only: [:show, :create, :index, :update]
  resources :receptions, only: [:index, :create, :update] do
    resources :concessions, only: [:create]
    resources :decorations, only: [:create]
  end
  resources :concessions, only: [:update, :destroy]
  resources :decorations, only: [:update, :destroy]

  resources :attendances, only: [:create, :index] do
    resources :guests, only: [:create, :index]
  end
  resources :guests, only: [:update, :destroy]

  resources :expenses, only: [:index, :create, :update, :destroy]

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
