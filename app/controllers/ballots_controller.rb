class BallotsController < ApplicationController
  before_action :set_ballot, only: [:show, :update]

  def index
    @ballots =
      if params[:round_id]
        Round.find(params[:round_id]).ballots
      else
        Ballot.all
      end
    render json: @ballots.to_json(only: %i[id first_choice second_choice third_choice], include: [round: { only: %i[round_number] }])
  end

  def show
    render json: @ballot.to_json(only: %i[id first_choice second_choice third_choice], include: [round: { only: %i[round_number] }])
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
