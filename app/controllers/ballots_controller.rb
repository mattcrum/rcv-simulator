class BallotsController < ApplicationController
  before_action :set_ballot, only: [:show, :update]

  def index
    ballots = Ballot.all
    render json: ballots
  end

  def show
    render json: @ballot
  end

  def create
    ballot = Ballot.create(ballot_params)
    render json: ballot, status: 201
  end

  def update
    @ballot.update(ballot_params)
    render json: @ballot
  end

  private

  def ballot_params
    params.permit(:first_choice, :second_choice, :third_choice)
  end

  def set_ballot
    @ballot = Ballot.find(params[:id])
  end
end
