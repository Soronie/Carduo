import React from 'react';
import Cards from './Cards';
import Guide from './Guide';

export default class CarduoApp extends React.Component{
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