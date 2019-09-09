const choices = [ "Mushroom", "Supreme", "Pepperoni", "Hawaiian" ]

let mushroom = 0
let supreme = 0
let pepperoni = 0
let hawaiian = 0
let vote_tally = 1

$(document).ready(function() {
  createBallot();
  console.log("done")
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
  $.get( "/ballots/" + vote_tally + ".json" ).then(
    function(data) {
      console.log(data)
      let ballot = new Ballot(data);
      $("#first").append(choices[ballot.first_choice - 1])
      $("#second").append(choices[ballot.second_choice - 1])
      $("#third").append(choices[ballot.third_choice - 1])
    }
  );
}

function countVote(ballot) {
  switch(ballot.first_choice) {
    case 1:
      mushroom ++;
      console.log(mushroom);
      break;
    case 2:
      supreme ++;
      console.log(supreme);
      break;
    case 3:
      pepperoni ++;
      console.log(pepperoni);
      break;
    case 4:
      hawaiian ++;
      console.log(pepperoni);
      break;
  }
}

function displayVotes() {
  $("div[data-id=1]").append("(" + mushroom + " Votes)")
  $("div[data-id=2]").append("(" + supreme + " Votes)")
  $("div[data-id=3]").append("(" + pepperoni + " Votes)")
  $("div[data-id=4]").append("(" + hawaiian + " Votes)")
}

document.addEventListener("dragenter", function(event) {
  debugger;
  if ( event.target.className == "droptarget" ) {
    event.target.style.border = "3px dotted green";
  } else if (event.target.className == "notarget") {
    event.target.style.border = "3px dotted red";
  }
});

document.addEventListener("dragover", function(event) {
  event.preventDefault();
});

document.addEventListener("dragleave", function(event) {
  if ( event.target.className == "droptarget" ) {
    event.target.style.border = "";
  } else if (event.target.className = "notarget") {
    event.target.style.border = "";
  }
});

document.addEventListener("drop", function(event) {
  if (event.target.className == "droptarget") {
    document.getElementById("droptarget").style.color="green";
  }
});
