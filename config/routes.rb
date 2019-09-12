Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'base#index'
  get "/game", to: "base#show"
  resources :ballots, only: [:index, :show]
  resources :rounds do
    resources :ballots, only: [:index, :show]
  end
end
