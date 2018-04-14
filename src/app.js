class CarduoApp extends React.Component{
	constructor(props){
		super(props);
		this.updateLives = this.updateLives.bind(this);
		this.beginGame = this.beginGame.bind(this);
		this.incrementScore = this.incrementScore.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			positions: [],
			selected: [],
			colors: [],
			gameRunning: false,
			gameLoading: false,
			count: 0,
			score: 0,
			lives: 10
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
						this.stopGame();
						$('.fa:not(lives)').animate({opacity: 1}, 500);
					}
				}
			);
		}
	}

	incrementScore(){
		this.setState((prevState) => {
			return {
				score: prevState.score+1,
				count: prevState.count+2
			}
		}, () => {
			if(this.state.count === 16){
				this.stopGame();
				setTimeout(() => {
					this.beginGame();
				}, 1000);
			}
		});
	}

	stopGame(){
		this.setState(() => {
			return {
				gameRunning: this.state.lives > 0 ? true : false,
				selected: Array(16).fill(false)
			}
		});
	}

	// Game begins when the player presses the button
	beginGame(){
		if(this.state.gameLoading) return;
		let pos = this.generateRandomPositions();
		let col = this.generateRandomColors();
		let sel = Array(16).fill(false);
		this.setState(() => {
				return {
					positions: pos,
					colors: col,
					selected: sel,
					gameRunning: false,
					gameLoading: true,
					score: this.state.count === 16 ? this.state.score : 0,
					lives: this.state.count === 16 ? this.state.lives : 10,
					count: 0
				};
			}, () => {
				$('.fa:not(.lives)').parent().animate({opacity: 1}, 500);
				$('.fa:not(.lives)').animate({opacity: 1}, 100);
				$('.fa:not(.lives)').animate({opacity: 0}, 5000, () => {
				this.setState(() => {
						return {
							gameRunning: true,
							gameLoading: false
						};
					});
				});
		});
	}

	generateRandomColors(){
		let arr = [];
		for(let i = 0; i < 8; i++){
			var count = 0;
			var intensities = [];
			while(intensities.length < 3){
				intensities.push(Math.floor(Math.random()*256 - 64));
			}
			arr.push(`rgb(${intensities[0]}, ${intensities[1]}, ${intensities[2]}`);
		}
		return arr;
	}

	handleChange(selectedCards){
		this.setState(() => {
			return {
				selected: selectedCards
			}
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
							lives={this.state.lives}
							positions={this.state.positions}
							incrementScore={this.incrementScore}
							colors={this.state.colors}
							handleChange={this.handleChange}
							selected={this.state.selected}/>

						<Guide
							beginGame={this.beginGame}
							lives={this.state.lives}
							isGameRunning={this.state.gameRunning}
							score={this.state.score}/>
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

		// first: the first card picked to see if second selection matches
		this.state = {
			first: undefined
		}
	}

	handleSelected(card){
		// If the card is selected when the game isn't running, return
		if(!this.props.isGameRunning || this.props.selected[card.id]) return;

		$(`#${card.id}`).animate({opacity: 1}, 100);
		// If the card is the first one picked or the game has restarted, store its value
		if(!this.state.first || this.props.selected.indexOf(true) === -1){
			this.setState(() => {
				let selected = this.props.selected.slice();
				selected[card.id] = true;
				this.props.handleChange(selected);
				return {
					first: card
				};
			});
		}else{	// The second card was picked, so see if it matches first
			this.setState(() => {
				let dec = false;
				let selected = this.props.selected;

				// If the cards match, mark the second card as selected
				if(this.state.first.className === card.className){
					$(`#${this.state.first.id}`).parent().fadeTo(750, 0);
					$(`#${card.id}`).parent().fadeTo(750, 0);
					selected[card.id] = true;
					this.props.incrementScore();
				}else{ // The cards mismatch, so de-select the first card for the next attempt
					selected[this.state.first.id] = false;
					dec = true;

					// Don't fade out the last two selected cards when the player is on their last life
					if(this.props.lives > 1){
						$(`#${this.state.first.id}`).animate({opacity: 0}, 750);
						$(`#${card.id}`).animate({opacity: 0}, 750);
					}
				}

				// dec is true when there is a mismatch; false otherwise
				this.props.updateLives(dec);
				this.props.handleChange(selected);

				// Refresh first after a mis/match
				return {
					first: undefined
				};
			});
		}
	}

	render(){
		// Produce 16 cards on the app
		let cards = [];
		for(let i = 0; i < 16; i++){
			cards.push(<Card type={this.types[this.props.positions[i] % 8]} index={i}
				handleSelected={this.handleSelected}
				selected={this.props.selected[i]}
				color={this.props.colors[this.props.positions[i] % 8]}
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
				<i id={this.props.index}
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