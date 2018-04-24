$(document).ready(function() {
  var MatchingNumber = 0;
  var randomNumber = randomNumGen();
  var wins = 0;
  var losses = 0;
  var crystals;




  function randomNumGen() {
    return Math.floor(Math.random() * 102) + 19;
  }


  function randomCrystalNumber() {
    return {
      red: {
              points: Math.floor(Math.random() * 12) + 1,
               imageUrl: "assets/images/red.png"
      },
      green: {
              points: Math.floor(Math.random() * 12) + 1,
              imageUrl: "assets/images/green.png"
      },
      yellow: {
              points: Math.floor(Math.random() * 12) + 1,
              imageUrl: "assets/images/yellow.png"
      },
      blue: {
              points: Math.floor(Math.random() * 12) + 1,
              imageUrl: "assets/images/blue.png"
      }
    };
  }


  function setGame() {
    MatchingNumber = 0;
    crystals = randomCrystalNumber();
    randomNum = randomNumGen();
    $("#block1").text(randomNumber);
  }



  function updateScreenData(Winner) {
    $("#winner").empty();

        if (Winner === true) {
            $("#winner").append($("<p>").text("You win!!"));
            setGame();
            renderMatchingNumber();
        }
        else if (Winner === false) {
            $("#winner").append($("<p>").text("You lose!!!"));
            setGame();
            renderMatchingNumber();
        }

    var wSpan = $("<span>").text(wins);
    var lSpan = $("<span>").text(losses);

    var pWins = $("<p>").text("Wins: ");
    var pLosses = $("<p>").text("Losses: ");

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $("#winner").append(pWins);
    $("#winner").append(pLosses);
  }



  function renderCrystals() {
    for (var key in crystals) {
      var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
      var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
      crystalDiv.append(crystalImg);
      $("#crystal-area").append(crystalDiv);
    }
  }



  function updateMatchingNumber(crystal) {
    MatchingNumber += crystals[crystal.attr("data-name")].points;
  }



  function renderMatchingNumber() {
    var scoreNumDiv = $("<div id='score-number'>").text(MatchingNumber);
    $("#score-area").html();
    $("#score-area").html(scoreNumDiv);
  }

  setGame();
  updateScreenData();
  renderCrystals();
  renderMatchingNumber();

  $(".crystals-button").on("click", function(event) {
    updateMatchingNumber($(this));
    renderMatchingNumber();

    if (MatchingNumber === randomNumber) {
      wins++;
      setGame();
      updateScreenData(true);
    }
    else if (MatchingNumber > randomNumber) {
      losses++;
      setGame();
      updateScreenData(false);
    }
  });

});
