class CarduoApp extends React.Component{
	constructor(props){
		super(props);
		this.updateLives = this.updateLives.bind(this);
		this.beginGame = this.beginGame.bind(this);
		this.state = {
			count: 0,
			gameRunning: false,
			lives: 5
		}
	}

	// Called whenever two cards are selected
	updateLives(decrement){
		// If the cards mismatch, decrement the player's lives
		if(decrement){
			this.setState((prevState) => {
				return {
					lives: prevState.lives-1
				};
			},
				// If the player has 0 lives remaining, stop the game
				() => {
					if(this.state.lives === 0){
						this.setState(() => {
							return {
								gameRunning: false
							};
						});
					}
				}
			);
		}
	}

	// Game begins when the player presses the button
	beginGame(){
		this.setState(() => {
			return {
				gameRunning: true,
				lives: 5
			};
		});
	}

	render(){
		this.title = 'Carduo';

		return(
			<div>
				<h1>{this.title}</h1>
				<div className="container">
					<div className="row">
						<Cards
							isGameRunning={this.state.gameRunning}
							updateLives={this.updateLives}
							handleCount={this.handleCount}/>

						<Guide
							beginGame={this.beginGame}
							lives={this.state.lives}
							isGameRunning={this.state.gameRunning}
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
		this.handleSelected = this.handleSelected.bind(this);
		this.types = [
			"fire",
			"gamepad",
			"shield",
			"chain-broken",
			"leaf",
			"music",
			"smile-o",
			"heart"
		];

		// Generate random positions for the cards
		let pos = this.generateRandomPositions();
		let selected = Array(16).fill(false);

		// positions: index values that correspond to a card type
		// selected: keeps track of selected cards to prevent re-selecting matched cards
		// first: the first card picked to see if second selection matches
		this.state = {
			positions: pos,
			selected: selected,
			first: undefined
		}
	}

	// Generate random numbers between [0, 15] within an array
	generateRandomPositions(){
		let arr = [];

		while(arr.length < 16){
			var randomNumber = Math.floor(Math.random()*16);
			if(arr.indexOf(randomNumber) === -1)
				arr[arr.length] = randomNumber;
		}

		return arr;
	}


	handleSelected(card){
		// If the card is selected when the game isn't running, return
		if(!this.props.isGameRunning) return;

		// If the card is the first one picked, store its value
		if(!this.state.first){
			this.setState((prevState) => {
				let selected = prevState.selected.slice();
				selected[card.id] = true;
				return {
					first: card,
					selected: selected
				};
			});
		}else{	// The second card was picked, so see if it matches first
			this.setState((prevState) => {
				let dec = false;
				let selected = prevState.selected.slice();

				// If the cards match, mark the second card as selected
				if(this.state.first.className === card.className){
					selected[card.id] = true;
				}else{ // The cards mismatch, so de-select the first card for the next attempt
					selected[this.state.first.id] = false;
					dec = true;
				}

				// dec is true when there is a mismatch
				// dec is false when there is a match
				this.props.updateLives(dec);

				// update the cards state and refresh first
				return {
					selected: selected,
					first: undefined
				};
			});
		}
	}

	render(){
		// Produce 16 cards on the app
		let cards = [];
		for(let i = 0; i < 16; i++){
			cards.push(<Card type={this.types[this.state.positions[i] % 8]} index={i}
				handleSelected={this.handleSelected}
				selected={this.state.selected[i]}
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
		this.handleSelected = this.handleSelected.bind(this);
	}

	handleSelected(e){
		// If the item has not been selected before, possibly mark it as selected
		if(!this.props.selected){
			this.props.handleSelected(e.target);
		}
	}

	render(){
		return(
			<div onClick={this.handleSelected} className="col-xs-3 card">
				<i id={this.props.index} className={"fa " + this.props.type} aria-hidden="true"></i>
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
					<h2 id="score">0</h2>
				</div>
				<div>
					<i className="fa fa-heart-o lives" aria-hidden="true"> x </i><span id="lives">{this.props.lives}</span>
				</div>
				<button onClick={this.props.beginGame} className="btn btn-primary btn-default">
					{!this.props.isGameRunning ? ((this.props.lives > 0) ? 'Begin Game' : 'Play Again' ) : 'Restart Game'}
				</button>
				<div id="instruction">
					{!this.props.isGameRunning && 'Match as many cards as you can!'}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<CarduoApp />, document.getElementById('app'));