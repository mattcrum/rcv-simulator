const CHOICES = [ "Mushroom", "Supreme", "Pepperoni", "Hawaiian" ]

let mushroom = 0
let supreme = 0
let pepperoni = 0
let hawaiian = 0
let vote_tally = 0
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
  if (vote_tally < 16) {
    let vote = vote_tally + 1
    $.get( "/ballots/" + vote + ".json" ).then(
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
    $(".alert").text("");
    checkRunoff();
  }
}

function checkRunoff() {
  alert("Congratulations on counting your first round of votes! To move on to the next round, check the amount of votes for each candidate and click on the one with the least amount of votes so we can re-count their ballot.")
  $("#4").on("click", function(event) {
    alert("Correct! Now let's move onto the second round, and re-count those ballots.")
    $("#4").hide();
    newRound();
  })
}

function newRound() {
  vote_tally = 0;
  round ++;
  $(".vote_tally").text("");
  $("#round").text("Round " + round);
  createBallot();
}

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
  $(".vote_tally").text("(Votes Counted: " + vote_tally + ")");
}

function onDragEnter(event) {
  event.preventDefault();
  if ( event.target.id === $(".ballot").attr("id") ) {
    event.target.style.border = "3px dotted white";
  } else {
    event.target.style.border = "3px dotted red";
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
    $(".alert").text("CORRECT").attr("id", "correct")
    event.target.style.border = "";
    countVote();
    createBallot();
  } else {
    $(".alert").text("PLEASE TRY AGAIN").attr("id", "incorrect")
    event.target.style.border = "";
  }
}
