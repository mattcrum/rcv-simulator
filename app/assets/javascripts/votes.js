$(document).ready(function() {
  createBallots();
  for (let i=0; i < ballots.length; i++) {
    countVote(ballots[i].first_choice);
  }
  console.log("done")
});
let ballots = []
let mushroom = 0
let supreme = 0
let pepperoni = 0
let hawaiian = 0

class Ballot {
  constructor(data) {
    this.first_choice = data[0];
    this.second_choice = data[1];
    this.third_choice = data[2];
  }
}

// Mushroom: 1, Supreme: 2, Pepperoni: 3, Hawaiian: 4

const votes = [[1, 4, 2], [3, 2, 4], [3, 1, 2], [3, 2, 4], [3, 2, 1], [3, 1, 2], [4, 3, 1], [4, 3, 2], [2, 3, 1], [2, 3, 4], [2, 1, 4], [1, 3, 2], [1, 2, 4], [1, 3, 2], [1, 2, 4], [1, 3, 2]]

function createBallots() {
  for (let i=0; i < votes.length; i++) {
    var ballot = new Ballot(votes[i])
    ballots.push(ballot);
  }
}

function countVote(ballot) {
  switch(ballot) {
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
