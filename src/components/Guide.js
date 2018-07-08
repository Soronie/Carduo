import React from 'react';

export default class Guide extends React.Component{
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