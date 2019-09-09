class BallotsController < ApplicationController
  before_action :set_ballot, only: [:show, :update]

  def index
    @ballots = Ballot.all
    render json: @ballots.to_json(only: %i[id first_choice second_choice third_choice])
  end

  def show
    render json: @ballot.to_json(only: %i[id first_choice second_choice third_choice])
  end

  def create
    ballot = Ballot.create(ballot_params)
    render json: ballot, status: 201
  end

private

  def ballot_params
    params.permit(:first_choice, :second_choice, :third_choice)
  end

  def set_ballot
    @ballot = Ballot.find(params[:id])
  end
end
