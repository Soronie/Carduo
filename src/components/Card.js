import React from 'react';

export default (props) => {
	const handleSelectedCard = function(e){
		// If the item has not been selected before, possibly mark it as selected
		if(!props.selected){
			props.handleSelectedCard(e.target);
		}
	}

	return(
		<div className="col-xs-3 card">
			<i id={props.index}
				onClick={handleSelectedCard}
				className={"fa fa-" + props.type}
				aria-hidden="true"
				style={{backgroundColor: props.color}}>
			</i>
		</div>
	);
}