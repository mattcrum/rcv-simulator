const CHOICES = [ "Mushroom", "Supreme", "Pepperoni", "Hawaiian" ]

let mushroom = 0
let supreme = 0
let pepperoni = 0
let hawaiian = 0
let vote_tally = 1
let round = 1
let ballots = []

$(document).ready(function() {
  createBallot();
  $(".candidate").on("dragenter", onDragEnter).on("dragover", onDragOver).on("dragleave", onDragLeave).on("drop", onDrop);
});

class Ballot {
  constructor(data) {
    this.id = data.id
    this.first_choice = data.first_choice;
    this.second_choice = data.second_choice;
    this.third_choice = data.third_choice;
  }
}

// Mushroom: 0, Supreme: 1, Pepperoni: 2, Hawaiian: 3

function createBallot() {
  if (vote_tally < 17) {
    $.get( "/ballots/" + vote_tally + ".json" ).then(
      function(data) {
        let ballot = new Ballot(data);
        $("#first").text(CHOICES[ballot.first_choice - 1])
        $("#second").text(CHOICES[ballot.second_choice - 1])
        $("#third").text(CHOICES[ballot.third_choice - 1])
        switch(round) {
          case 1:
            $(".ballot").attr("id", ballot.first_choice);
            break;
          case 2:
            $(".ballot").attr("id", ballot.second_choice);
            break;
          case 3:
            $(".ballot").attr("id", ballot.third_round);
            break;
        }
      }
    );
  } else {
    alert("All Done!")
    $("#alert").text("");
    newRound();
    createBallot();
  }
}

function newRound() {
  vote_tally = 1;
  round ++;
  $("#1-count").text("");
  $("#2-count").text("");
  $("#3-count").text("");
  $("#4-count").text("");
  $("#round").text("Round " + round);
}

// ------------- NOT USED YET --------------------
function countVote() {
  switch($(".ballot").attr("id")) {
    case "1":
      mushroom ++;
      $("#1-count").text("(Votes: " + mushroom + ")")
      break;
    case "2":
      supreme ++;
      $("#2-count").text("(Votes: " + supreme + ")")
      break;
    case "3":
      pepperoni ++;
      $("#3-count").text("(Votes: " + pepperoni + ")")
      break;
    case "4":
      hawaiian ++;
      $("#4-count").text("(Votes: " + hawaiian + ")")
      break;
  }
  vote_tally ++;
}

function onDragEnter(event) {
  event.preventDefault();
  if ( event.target.id === $(".ballot").attr("id") ) {
    event.target.style.border = "3px dotted white";
    console.log("Match")
  } else {
    event.target.style.border = "3px dotted red";
    console.log("Next")
  }
}

function onDragLeave(event) {
  event.preventDefault();
  event.target.style.border = "";
}

function onDragOver(event) {
  event.preventDefault();
  console.log("onDragOver")
}

function onDrop(event) {
  event.preventDefault();
  if ( event.target.id === $(".ballot").attr("id") ) {
    $("#alert").text("CORRECT")
    event.target.style.border = "";
    countVote();
    createBallot();
  } else {
    $("#alert").text("PLEASE TRY AGAIN")
    event.target.style.border = "";
  }
}
