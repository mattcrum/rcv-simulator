const CHOICES = [ "Mushroom", "Supreme", "Pepperoni", "Hawaiian" ];

let mushroom = 0;
let supreme = 0;
let pepperoni = 0;
let hawaiian = 0;
let vote_tally = 1;
let vote_counter = 0;
let round = 1;
let ballots = [];
let counter = 0;

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

// --------------------------------- CODE FOR CREATING BALLOTS ---------------------------------
function createBallot() {
  if (vote_tally < 17) {
    $.get( "/rounds/1/ballots/" + vote_tally + ".json" ).then(
      function(data) {
        let ballot = new Ballot(data);
        $("#first").text(CHOICES[ballot.first_choice - 1])
        $("#second").text(CHOICES[ballot.second_choice - 1])
        $("#third").text(CHOICES[ballot.third_choice - 1])
        $(".ballot").attr("id", ballot.first_choice);
      }
    );
  } else {
    $(".alert").text("");
    checkRunoff();
  }
}

function createSecondBallot() {
  if (vote_tally < 19) {
    $.get( "/rounds/2/ballots/" + vote_tally + ".json" ).then(
      function(data) {
        let ballot = new Ballot(data);
        $("#first").text(CHOICES[ballot.first_choice - 1]);
        $("#second").text(CHOICES[ballot.second_choice - 1]);
        $("#third").text(CHOICES[ballot.third_choice - 1]);
        $(".ballot").attr("id", ballot.second_choice);
        $("#first").addClass("counted");
      }
    );
  } else {
    $(".alert").text("");
    checkSecondRunoff();
  }
}

function createThirdBallot() {
  if (vote_tally < 22) {
    $.get("/rounds/3/ballots/" + vote_tally + ".json").then(
      function(data) {
        let ballot = new Ballot(data);
        $("#first").text(CHOICES[ballot.first_choice - 1]);
        $("#second").text(CHOICES[ballot.second_choice - 1]);
        $("#third").text(CHOICES[ballot.third_choice - 1]);
        $("#first").addClass("counted");
        if (ballot.second_choice === 4) {
          $("#second").addClass("counted");
          $(".ballot").attr("id", ballot.third_choice);
        } else {
          $("#second").attr("class", "")
          $(".ballot").attr("id", ballot.second_choice);
        }
      }
    );
  } else {
    checkWinner();
  }
}

// --------------------------------- CODE FOR DOING ROUNDS ---------------------------------

function checkRunoff() {
  $(".ballot").hide();
  $("#round").hide();
  $("#runoff").show();
  $("#info").text("Next we need to determine if any candidate has a majority. With 16 ballots, a majority would be 9 votes. Has any pizza received 9 votes?")
  $(".runoff").css('display', 'inline-block').show();
  $("#no").on("click", function(event) {
    $(".candidate").show();
    $(".alert").hide();
    $(".runoff").hide();
    $("#info").text("Since no candidate received a majority, we eliminate the least popular pizza and move those ballots to the voters' next available choices. Click on the least popular pizza");
    $("#4").on("click", function(event) {
      $("#info").text("Correct! Now you will see the ballots of the voters who chose Hawaiian. On each ballot, Hawaiian will be crossed out, since it is eliminated. ");
      $(".candidate").hide();
      $("#next").css('display', 'inline-block').show();
      $("#next").on("click", function(event) {
        $(".candidate").show();
        $(".ballot").show();
        $("#4").hide();
        $("#runoff").hide();
        $("#round").show();
        $("#next").hide();
        $("#info").text("Drag the ballots onto the stack that matches each ballot's next available choice")
      });
    });
  });
  $("#yes").on("click", function(event) {
    $(".alert").text("PLEASE TRY AGAIN").attr("id", "incorrect")
  });
  nextRound();
  createSecondBallot();
}

function checkSecondRunoff() {
  $(".ballot").hide();
  $("#round").hide();
  $("#runoff").show();
  $("#info").text("Next we need to determine if any candidate has a majority. With 16 ballots, a majority would be 9 votes. Has any pizza received 9 votes?")
  $(".runoff").css('display', 'inline-block').show();
  $("#no").on("click", function(event) {
    $(".candidate").show();
    $("#4").hide();
    $(".alert").hide();
    $(".runoff").hide();
    $("#info").text("Since no candidate received a majority, we eliminate the least popular pizza and move those ballots to the voters' next available choices. Click on the least popular pizza");
    $("#2").on("click", function(event) {
      $("#info").text("Correct!  Now you will see the ballots of the voters who chose Supreme. On each ballot, all of the eliminated pizzas will be crossed out.");
      $(".candidate").hide();
      $("#next").css('display', 'inline-block').show();
      $("#next").on("click", function(event) {
        $(".ballot").show();
        $("#1").show();
        $("#2").css('display', 'none').hide();
        $("#3").show();
        $("#runoff").hide();
        $("#round").show();
        $("#next").hide();
        $("#info").text("Drag the ballots onto the stack that matches each ballot's next available choice.")
      });
    });
  });
  nextRound();
  createThirdBallot();
}

function checkWinner() {
  $(".ballot").hide();
  $("#round").hide();
  $(".vote_counter").hide();
  $(".alert").hide();
  $("#runoff").show();
  $("#info").text("Now, look at the total votes and click on the winning pizza.")
  $("#3").on("click", function(event) {
    $("#1").hide();
    $("#round").text("Congratulations!").show();
    $("#runoff").hide();
    $("#3-count").text("WINNER")
    $("#info").text("As you can see, Ranked Choice Voting allows us to easily determine which type of pizza is most preferred by most people. To play again, just refresh this page.")
    $(".gif").show();
  });
}

function nextRound() {
  vote_counter = 0;
  round ++;
  $(".vote_counter").text("");
  $("#round").text("Round " + round);
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
  console.log(vote_tally);
  vote_counter ++;
  $(".vote_counter").text("(Votes Counted: " + vote_counter + ")");
}

// --------------------------------- CODE FOR DRAG EVENTS ---------------------------------
function onDragEnter(event) {
  event.preventDefault();
  if ( event.target.id === $(".ballot").attr("id") ) {
    $(this).addClass('correct');
  } else {
    $(this).addClass('incorrect');
  }
}

function onDragLeave(event) {
  event.preventDefault();
  if ( event.target.id === $(".ballot").attr("id") ) {
    $(this).removeClass('correct');
  } else {
    $(this).removeClass('incorrect');
  }
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  event.preventDefault();
  if ( event.target.id === $(".ballot").attr("id") ) {
    $(".alert").text("CORRECT").attr("id", "correct")
    $(this).removeClass('correct');
    $(this).removeClass('incorrect');
    countVote();
    switch(round) {
      case 1:
        createBallot();
        break;
      case 2:
        createSecondBallot();
        break;
      case 3:
        createThirdBallot();
        break;
    }
  } else {
    $(".alert").text("PLEASE TRY AGAIN").attr("id", "incorrect")
    event.target.style.border = "";
  }
}
