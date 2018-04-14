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

		let pos = this.generateRandomPositions();
		let selected = Array(16).fill(false);

		this.state = {
			positions: pos,
			selected: selected,
			first: undefined
		}
	}

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
		console.log(card.id + " " + card.className);
		if(!this.state.first){
			this.setState((prevState) => {
				let selected = prevState.selected.slice();
				selected[card.id] = true;
				return {
					first: card,
					selected: selected
				};
			});
		}else{
			this.setState((prevState) => {
				let selected = prevState.selected.slice();

				if(this.state.first.className === card.className){
					selected[card.id] = true;
				}else{
					selected[this.state.first.id] = false;
				}

				return {
					selected: selected,
					first: undefined
				};
			});
		}

		return false;
	}

	render(){
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