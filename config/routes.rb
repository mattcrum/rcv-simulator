Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'base#index'
  resources :ballots, only: [:index, :show]
end
