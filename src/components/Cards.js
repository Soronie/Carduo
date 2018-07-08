import React from 'react';
import Card from './Card';

export default class Cards extends React.Component{
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