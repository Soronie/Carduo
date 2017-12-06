// Select all the cards
var cards = document.querySelectorAll(".fa");
// Keep track of colors for each set of icons
var cardColors = {};
var first = null;
var second = null;

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
$(".fa").on("click", function(){
	var icon = $(this);
	var unMatched = icon.attr("class").indexOf("selected") === -1;
	if(!unMatched) return;

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
		{	// If the icons don't match, they are no longer selected
			first.removeClass("selected");
			second.removeClass("selected");
		}

		// Discard current cards for the next round
		first = second = null;
	}

	// Check to see if all the cards are cleared. If so, increment the score
	// and start a new round
	if($(".selected").length === $(".card").length)
		console.log("The current round is over. Increment score.");

});

// Return a random color of somewhat strong intensity
function randomColor() {
	var intensities = [];
	for(var i = 0; i < 3; i++)
		intensities.push(Math.floor(Math.random()*256 - 64));
	return "rgb(" + intensities[0] + ", " + intensities[1] + ", " + intensities[2] + ")";
}