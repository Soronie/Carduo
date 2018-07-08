import React from 'react';

export default (props) => (
			<div id="right" className="col-xs-6 half">
				<div>
					<h2>Score</h2>
					<h2 id="score">{props.score}</h2>
				</div>
				<div>
					<i className="fa fa-heart-o lives" aria-hidden="true"> x </i><span id="lives">{props.lives}</span>
				</div>
				<button onClick={props.beginGame} className="btn btn-primary btn-default">
					{!props.isGameRunning ? ((props.lives > 0) ? 'Begin Game' : 'Play Again' ) : 'Restart Game'}
				</button>
				<div id="instruction">
					Match as many cards as you can!
				</div>
			</div>
);