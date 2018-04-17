class CarduoApp extends React.Component{
	constructor(props){
		super(props);
		this.updateLives = this.updateLives.bind(this);
		this.beginGame = this.beginGame.bind(this);
		this.incrementScore = this.incrementScore.bind(this);
		this.handleSelectedCard = this.handleSelectedCard.bind(this);
		this.title = 'Carduo';
		this.initialLives = 10;
		this.types= [
			"fire",
			"gamepad",
			"shield",
			"chain-broken",
			"leaf",
			"music",
			"smile-o",
			"heart",
		];
		this.totalCards = this.types.length*2;
		this.state = {
			positions: [],
			selected: [],
			colors: [],
			isGameRunning: false,
			isGameLoading: false,
			matchedCards: 0,
			score: 0,
			lives: this.initialLives
		}
	}

	// Generate random numbers between [0, 15] within an array
	generateRandomPositions(){
		let arr = [];

		while(arr.length < this.totalCards){
			var randomNumber = Math.floor(Math.random()*this.totalCards);
			if(arr.indexOf(randomNumber) === -1)
				arr[arr.length] = randomNumber;
		}

		return arr;
	}

	// Called whenever two cards are selected
	updateLives(decrementLife){
		// If the cards mismatch, decrementLiferement the player's lives
		if(decrementLife){
			this.setState((prevState) => {
				return {
					lives: prevState.lives-1
				};
			},
				// If the player has 0 lives remaining, stop the game
				() => {
					if(this.state.lives === 0){
						this.stopGame();
						// Reveal all the cards to the player
						$('.fa:not(.lives)').animate({opacity: 1}, 500);
					}
				}
			);
		}
	}

	incrementScore(){
		// Increase score by one and matched cards by 2
		this.setState((prevState) => {
			return {
				score: prevState.score+1,
				matchedCards: prevState.matchedCards+2
			}
		}, () => {
			// If all the cards are matched, restart a new round
			if(this.state.matchedCards === this.totalCards){
				this.stopGame();
				setTimeout(() => {
					this.beginGame();
				}, 1000);
			}
		});
	}

	stopGame(){
		// After a round is completed, either restart a new round or stop
		this.setState(() => {
			return {
				isGameRunning: this.state.lives > 0 ? true : false,
				selected: Array(this.totalCards).fill(false)
			}
		});
	}

	// Game begins when the player presses the button
	beginGame(){
		if(this.state.isGameLoading) return;
		let pos = this.generateRandomPositions();
		let col = this.generateRandomColors();
		let sel = Array(this.totalCards).fill(false);
		let restart = !(this.state.matchedCards === this.totalCards);
		$('.fa:not(.lives)').parent().removeClass('selected');
		this.setState(() => {
				return {
					positions: pos,
					colors: col,
					selected: sel,
					isGameRunning: false,
					isGameLoading: true,
					score: restart ? 0 : this.state.score,
					lives: restart ? this.initialLives : this.state.lives,
					matchedCards: 0
				};
			}, () => {
				// Briefly reveal the cards to the player, which fade over time
				$('.fa:not(.lives)').parent().animate({opacity: 1}, 500);
				$('.fa:not(.lives)').animate({opacity: 1}, 100);
				$('.fa:not(.lives)').animate({opacity: 0}, 5000, () => {
				this.setState(() => {
						return {
							isGameRunning: true,
							isGameLoading: false
						};
					});
				});
		});
	}

	generateRandomColors(){
		// Generate random colors for the given card set
		let arr = [];
		for(let i = 0; i < this.totalCards/2; i++){
			var matchedCards = 0;
			var intensities = [];
			while(intensities.length < 3){
				intensities.push(Math.floor(Math.random()*256 - 64));
			}
			arr.push(`rgb(${intensities[0]}, ${intensities[1]}, ${intensities[2]}`);
		}
		return arr;
	}

	handleSelectedCard(selectedCards){
		// Update selected state for the cards
		this.setState(() => {
			return {
				selected: selectedCards
			}
		});
	}

	render(){
		return(
			<div>
				<h1>{this.title}</h1>
				<div className="container">
					<div className="row">
						<Cards
							positions={this.state.positions}
							colors={this.state.colors}
							selected={this.state.selected}
							types={this.types}
							lives={this.state.lives}
							totalCards={this.totalCards}
							isGameRunning={this.state.isGameRunning}
							updateLives={this.updateLives}
							incrementScore={this.incrementScore}
							handleSelectedCard={this.handleSelectedCard}
						/>

						<Guide
							beginGame={this.beginGame}
							lives={this.state.lives}
							isGameRunning={this.state.isGameRunning}
							score={this.state.score}
						/>
					</div>
				</div>
			</div>
		);
	}
}

class Cards extends React.Component{
	constructor(props){
		super(props);
		this.handleSelectedCard = this.handleSelectedCard.bind(this);

		// first: the first card picked to see if second selection matches
		this.state = {
			first: undefined
		}
	}

	handleSelectedCard(card){
		// If the card is selected when the game isn't running, return
		if(!this.props.isGameRunning) return;

		$(`#${card.id}`).parent().addClass('selected');
		let selected = this.props.selected;


		$(`#${card.id}`).animate({opacity: 1}, 100);
		// If the card is the first one picked or the game has restarted, store its value
		if(!this.state.first || this.props.selected.indexOf(true) === -1){
			this.setState(() => {
				return {
					first: card
				};
			});
			selected[card.id] = true;
		}else{	// The second card was picked, so see if it matches first
			this.setState(() => {
				// Refresh first after a mis/match
				return {
					first: undefined
				};
			});	

			let decrementLife = false;

			// The cards match
			if(this.state.first.className === card.className){
				// Make first and second cards fade
				$(`#${this.state.first.id}`).parent().fadeTo(750, 0);
				$(`#${card.id}`).parent().fadeTo(750, 0);

				// Mark second card as selected, then increment score
				selected[card.id] = true;
				this.props.incrementScore();
			}else{ // The cards mismatch
				//De-select the first card for the next attempt
				//Decrement life
				selected[this.state.first.id] = false;
				decrementLife = true;

				// Remove selected state from card elements
				$(`#${this.state.first.id}`).parent().removeClass('selected');
				$(`#${card.id}`).parent().removeClass('selected');

				// Don't fade out the last two selected cards when the player is on their last life
				if(this.props.lives > 1){
					$(`#${this.state.first.id}`).animate({opacity: 0}, 750);
					$(`#${card.id}`).animate({opacity: 0}, 750);
				}
			}

			// decrementLife is true when there is a mismatch; false otherwise
			this.props.updateLives(decrementLife);
			// update selected states for cards
			this.props.handleSelectedCard(selected);
		}
	}

	render(){
		// Produce all cards on the app given random colors, positions, and selected states
		let cards = [];
		for(let i = 0; i < this.props.totalCards; i++){
			cards.push(
				<Card
					type={this.props.types[this.props.positions[i] % (this.props.types.length)]}
					index={i}
					handleSelectedCard={this.handleSelectedCard}
					selected={this.props.selected[i]}
					color={this.props.colors[this.props.positions[i] % (this.props.types.length)]}
					key={i}
				/>);
		}

		return(
			<div id="left" className="col-xs-6 half">
				<div className="row">
					{cards}
				</div>
			</div>
		);
	}
}

class Card extends React.Component{
	constructor(props){
		super(props);
		this.handleSelectedCard = this.handleSelectedCard.bind(this);
	}

	handleSelectedCard(e){
		// If the item has not been selected before, possibly mark it as selected
		if(!this.props.selected){
			this.props.handleSelectedCard(e.target);
		}
	}

	render(){
		return(
			<div className="col-xs-3 card">
				<i id={this.props.index}
					onClick={this.handleSelectedCard}
					className={"fa fa-" + this.props.type}
					aria-hidden="true"
					style={{backgroundColor: this.props.color}}>
				</i>
			</div>
		);
	}
}

class Guide extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id="right" className="col-xs-6 half">
				<div>
					<h2>Score</h2>
					<h2 id="score">{this.props.score}</h2>
				</div>
				<div>
					<i className="fa fa-heart-o lives" aria-hidden="true"> x </i><span id="lives">{this.props.lives}</span>
				</div>
				<button onClick={this.props.beginGame} className="btn btn-primary btn-default">
					{!this.props.isGameRunning ? ((this.props.lives > 0) ? 'Begin Game' : 'Play Again' ) : 'Restart Game'}
				</button>
				<div id="instruction">
					Match as many cards as you can!
				</div>
			</div>
		);
	}
}

ReactDOM.render(<CarduoApp />, document.getElementById('app'));