class CarduoApp extends React.Component{
	constructor(props){
		super(props);
		this.handleCount = this.handleCount.bind(this);
		this.state = {
			count: 0,
			gameRunning: false
		}
	}

	handleCount(inc){
		this.setState((prevState) => {
			return {
				count: prevState.count+inc
			};
		});

		this.setState((prevState) => {
			return {
				gameRunning: prevState.count < 16 ? true : false
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
						<Cards handleCount={this.handleCount}/>
						<Guide />
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
		this.state = {
			first: undefined,
			second: undefined
		}
	}

	handleSelected(card){
		if(!this.state.first && !this.state.second){
			this.setState(() => {
				return {
					first: card
				};
			});
		}else if(!this.state.second){
			this.setState(() => {
				return {
					second: card
				};
			});
		}else if(this.state.first === this.state.second){
			console.log("Found a match!");
		}else{
			this.setState(() => {
				first: undefined
				second: undefined
			});
		}
	}

	render(){
		let cards = [];
		for(let i = 0; i < 16; i++){
			cards.push(<Card handleSelected={this.handleSelected} key={i}/>);
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
		this.state = {
			selected: false
		}
	}

	handleSelected(e){
		if(!this.state.selected){
			this.setState(() => {
				return {
					selected: true
				};
			});
			this.props.handleSelected(e.target.className);
		}
	}

	render(){
		return(
			<div onClick={this.handleSelected} className="col-xs-3 card">
				<i className="fa" aria-hidden="true"></i>
			</div>
		);
	}
}

class Guide extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			lives: 5
		}
	}

	render(){
		return(
			<div id="right" className="col-xs-6 half">
				<div>
					<h2>Score</h2>
					<h2 id="score">0</h2>
				</div>
				<div>
					<i className="fa fa-heart-o lives" aria-hidden="true"> x </i><span id="lives">{this.state.lives}</span>
				</div>
				<button className="btn btn-primary btn-default">
					Begin Game
				</button>
				<div id="instruction">
					Match as many cards as you can!
				</div>
			</div>
		);
	}
}

ReactDOM.render(<CarduoApp />, document.getElementById('app'));