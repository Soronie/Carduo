// Select all the symbols of cards
var symbols = document.querySelectorAll(".fa:not(.lives)");
var types = [
	"fire",
	"gamepad",
	"shield",
	"chain-broken",
	"leaf",
	"music",
	"smile-o",
	"heart"
];

var first = null;
var second = null;
var gameRunning = false;
var numberOfCards = 16;

var scoreDisplay = document.querySelector("#score");
var livesDisplay = document.querySelector("#lives");

var randomPositions;

// Send initial lives as embedded js value later
var initialLives = Number(livesDisplay.textContent);

// When a card is clicked, mark it as selected
// and/or check if the first and second selected cards match
$(".fa:not(.lives)").on("click", function(){
	var unMatched = $(this).attr("class").indexOf("selected") === -1;
	if(!unMatched || !gameRunning) return;

	if(first === null){
		first = $(this);
		first.addClass("selected");
		first.animate({ opacity: 1}, 200);
	}else{
		second = $(this);
		second.addClass("selected");
		second.animate({ opacity: 1}, 200);

		var firstIcon = first.attr("class").split(' ')[1];
		var secondIcon = second.attr("class").split(' ')[1];

		if(firstIcon === secondIcon){	// If the icons match, make them invisible
			// Make them fade then set opacity to 0
			$(first).parent().fadeTo(750, 0);
			$(second).parent().fadeTo(750, 0);
		}else{	// If the icons don't match, deduct lives
			// The cards are no longer selected for the next attempt
			first.removeClass("selected");
			second.removeClass("selected");

			livesDisplay.textContent = Number(livesDisplay.textContent)-1;

			// If the player still has at least one life, make the two fade
			if(Number(livesDisplay.textContent) > 0){
				second.animate({ opacity: 0}, 400);
				first.animate({ opacity: 0}, 400);
			}
		}

		// Discard current cards for the next round
		first = second = null;
	}

	// Increment the score if the round is completed
	// End the game once there are no remaining lives
	if($(".selected").length === $(".card").length){
		scoreDisplay.textContent = Number(scoreDisplay.textContent)+1;
		setTimeout(revealCards, 1250);
	}else if(Number(livesDisplay.textContent) === 0){
		// Reveal every card when the game is over
		gameRunning = false;
		$(".fa:not(.lives)").animate({ opacity: 1}, 300);
		$(".btn").text("Play Again?");
		$(".btn").css("visibility", "visible");
	}

});

// On the start/play again button, hide the button, reset the score, and reveal the cards
$(".btn").on("click", function(){
	$(this).css("visibility", "hidden");
	$("#instruction").css("visibility", "hidden");
	scoreDisplay.textContent = 0;
	revealCards();
});

// Return a random color of somewhat strong intensity
function randomColor() {
	var intensities = [];
	for(var i = 0; i < 3; i++){
		intensities.push(Math.floor(Math.random()*256 - 64));
	}
	return "rgb(" + intensities[0] + ", " + intensities[1] + ", " + intensities[2] + ")";
}

function generateRandomPositions(num){
	var arr = [];

	while(arr.length < num){
		var randomNumber = Math.floor(Math.random()*numberOfCards);
		if(arr.indexOf(randomNumber) !== -1) continue;
		arr[arr.length] = randomNumber;
	}

	return arr;
}

function revealCards() {
	var newCards = $(".fa:not(.lives)");
	cardColors = {};

	livesDisplay.textContent = initialLives;
	$(newCards).removeClass("selected");

	if(randomPositions){
		for(var i = 0; i < symbols.length; i++)
			symbols[randomPositions[i]].classList.remove("fa-" + types[i % types.length]);
	}

	randomPositions = generateRandomPositions(numberOfCards);

	for(var i = 0; i < symbols.length; i++){
		symbols[randomPositions[i]].classList.add("fa-" + types[i % types.length]);
	}

	// Assign colors based on icon
	symbols.forEach(function(card){
		var key = card.classList[1];
		// If the current icon is new, store a random color for it
		if(!cardColors[key])
			cardColors[key] = randomColor();
		// Assign the card's color based on the key
		card.style.backgroundColor = cardColors[key];
	});

	$(newCards).parent().fadeTo(750, 1);
	$(newCards).animate({ opacity: 1 }, 750);
	$(newCards).animate({ opacity: 0 }, 5000, function(){
		gameRunning = true;
	});
}