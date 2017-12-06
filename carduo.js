// Select all the cards
var cards = document.querySelectorAll(".fa:not(.lives)");
// Keep track of colors for each set of icons
var cardColors = {};
var first = null;
var second = null;
var gameRunning = true;

var scoreDisplay = document.querySelector("#score");
var livesDisplay = document.querySelector("#lives");
var initialLives = Number(livesDisplay.textContent);

// Assign colors based on icon
cards.forEach(function(card){
	var key = card.classList[1];
	// If the current icon is new, store a random color for it
	if(!cardColors[key])
		cardColors[key] = randomColor();
	// Assign the card's color based on the key
	card.style.backgroundColor = cardColors[key];
});

// When a card is clicked, mark it as selected
// and/or check if the first and second selected cards match
$(".fa:not(.lives)").on("click", function(){
	var icon = $(this);
	var unMatched = icon.attr("class").indexOf("selected") === -1;
	if(!unMatched || !gameRunning) return;

	if(first === null)
	{
		first = icon;
		first.addClass("selected");
	}
	else
	{
		second = icon;
		second.addClass("selected");

		var firstIcon = first.attr("class").split(' ')[1];
		var secondIcon = second.attr("class").split(' ')[1];

		if(firstIcon === secondIcon)
		{	// If the icons match, make them invisible
			// Make them fade then set opacity to 0
			$(first).parent().fadeTo(250, 0);
			$(second).parent().fadeTo(250, 0);
		}
		else
		{	// If the icons don't match, deduct lives
			// The cards are no longer selected for the next attempt
			first.removeClass("selected");
			second.removeClass("selected");

			livesDisplay.textContent = Number(livesDisplay.textContent)-1;
		}

		// Discard current cards for the next round
		first = second = null;
	}

	// Increment the score if th round is completed
	// End the game once there are no remaining lives
	if($(".selected").length === $(".card").length)
	{
		scoreDisplay.textContent = Number(scoreDisplay.textContent)+1;
		livesDisplay.textContent = initialLives;
	}
	else if(Number(livesDisplay.textContent) === 0)
		gameRunning = false;

});

// Return a random color of somewhat strong intensity
function randomColor() {
	var intensities = [];
	for(var i = 0; i < 3; i++)
		intensities.push(Math.floor(Math.random()*256 - 64));
	return "rgb(" + intensities[0] + ", " + intensities[1] + ", " + intensities[2] + ")";
}