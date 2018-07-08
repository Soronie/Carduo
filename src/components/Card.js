import React from 'react';

export default class Card extends React.Component{
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