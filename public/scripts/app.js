"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CarduoApp = function (_React$Component) {
	_inherits(CarduoApp, _React$Component);

	function CarduoApp(props) {
		_classCallCheck(this, CarduoApp);

		var _this = _possibleConstructorReturn(this, (CarduoApp.__proto__ || Object.getPrototypeOf(CarduoApp)).call(this, props));

		_this.updateLives = _this.updateLives.bind(_this);
		_this.beginGame = _this.beginGame.bind(_this);
		_this.state = {
			count: 0,
			gameRunning: false,
			lives: 5
		};
		return _this;
	}

	// Called whenever two cards are selected


	_createClass(CarduoApp, [{
		key: "updateLives",
		value: function updateLives(decrement) {
			var _this2 = this;

			// If the cards mismatch, decrement the player's lives
			if (decrement) {
				this.setState(function (prevState) {
					return {
						lives: prevState.lives - 1
					};
				},
				// If the player has 0 lives remaining, stop the game
				function () {
					if (_this2.state.lives === 0) {
						_this2.setState(function () {
							return {
								gameRunning: false
							};
						});
					}
				});
			}
		}

		// Game begins when the player presses the button

	}, {
		key: "beginGame",
		value: function beginGame() {
			this.setState(function () {
				return {
					gameRunning: true,
					lives: 5
				};
			});
		}
	}, {
		key: "render",
		value: function render() {
			this.title = 'Carduo';

			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					this.title
				),
				React.createElement(
					"div",
					{ className: "container" },
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(Cards, {
							isGameRunning: this.state.gameRunning,
							updateLives: this.updateLives,
							handleCount: this.handleCount }),
						React.createElement(Guide, {
							beginGame: this.beginGame,
							lives: this.state.lives,
							isGameRunning: this.state.gameRunning
						})
					)
				)
			);
		}
	}]);

	return CarduoApp;
}(React.Component);

var Cards = function (_React$Component2) {
	_inherits(Cards, _React$Component2);

	function Cards(props) {
		_classCallCheck(this, Cards);

		var _this3 = _possibleConstructorReturn(this, (Cards.__proto__ || Object.getPrototypeOf(Cards)).call(this, props));

		_this3.handleSelected = _this3.handleSelected.bind(_this3);
		_this3.types = ["fire", "gamepad", "shield", "chain-broken", "leaf", "music", "smile-o", "heart"];

		// Generate random positions for the cards
		var pos = _this3.generateRandomPositions();
		var selected = Array(16).fill(false);

		// positions: index values that correspond to a card type
		// selected: keeps track of selected cards to prevent re-selecting matched cards
		// first: the first card picked to see if second selection matches
		_this3.state = {
			positions: pos,
			selected: selected,
			first: undefined
		};
		return _this3;
	}

	// Generate random numbers between [0, 15] within an array


	_createClass(Cards, [{
		key: "generateRandomPositions",
		value: function generateRandomPositions() {
			var arr = [];

			while (arr.length < 16) {
				var randomNumber = Math.floor(Math.random() * 16);
				if (arr.indexOf(randomNumber) === -1) arr[arr.length] = randomNumber;
			}

			return arr;
		}
	}, {
		key: "handleSelected",
		value: function handleSelected(card) {
			var _this4 = this;

			// If the card is selected when the game isn't running, return
			if (!this.props.isGameRunning) return;

			// If the card is the first one picked, store its value
			if (!this.state.first) {
				this.setState(function (prevState) {
					var selected = prevState.selected.slice();
					selected[card.id] = true;
					return {
						first: card,
						selected: selected
					};
				});
			} else {
				// The second card was picked, so see if it matches first
				this.setState(function (prevState) {
					var dec = false;
					var selected = prevState.selected.slice();

					// If the cards match, mark the second card as selected
					if (_this4.state.first.className === card.className) {
						selected[card.id] = true;
					} else {
						// The cards mismatch, so de-select the first card for the next attempt
						selected[_this4.state.first.id] = false;
						dec = true;
					}

					// dec is true when there is a mismatch
					// dec is false when there is a match
					_this4.props.updateLives(dec);

					// update the cards state and refresh first
					return {
						selected: selected,
						first: undefined
					};
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			// Produce 16 cards on the app
			var cards = [];
			for (var i = 0; i < 16; i++) {
				cards.push(React.createElement(Card, { type: this.types[this.state.positions[i] % 8], index: i,
					handleSelected: this.handleSelected,
					selected: this.state.selected[i],
					key: i
				}));
			}

			return React.createElement(
				"div",
				{ id: "left", className: "col-xs-6 half" },
				React.createElement(
					"div",
					{ className: "row" },
					cards
				)
			);
		}
	}]);

	return Cards;
}(React.Component);

var Card = function (_React$Component3) {
	_inherits(Card, _React$Component3);

	function Card(props) {
		_classCallCheck(this, Card);

		var _this5 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this5.handleSelected = _this5.handleSelected.bind(_this5);
		return _this5;
	}

	_createClass(Card, [{
		key: "handleSelected",
		value: function handleSelected(e) {
			// If the item has not been selected before, possibly mark it as selected
			if (!this.props.selected) {
				this.props.handleSelected(e.target);
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ onClick: this.handleSelected, className: "col-xs-3 card" },
				React.createElement("i", { id: this.props.index, className: "fa " + this.props.type, "aria-hidden": "true" })
			);
		}
	}]);

	return Card;
}(React.Component);

var Guide = function (_React$Component4) {
	_inherits(Guide, _React$Component4);

	function Guide(props) {
		_classCallCheck(this, Guide);

		return _possibleConstructorReturn(this, (Guide.__proto__ || Object.getPrototypeOf(Guide)).call(this, props));
	}

	_createClass(Guide, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "right", className: "col-xs-6 half" },
				React.createElement(
					"div",
					null,
					React.createElement(
						"h2",
						null,
						"Score"
					),
					React.createElement(
						"h2",
						{ id: "score" },
						"0"
					)
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"i",
						{ className: "fa fa-heart-o lives", "aria-hidden": "true" },
						" x "
					),
					React.createElement(
						"span",
						{ id: "lives" },
						this.props.lives
					)
				),
				React.createElement(
					"button",
					{ onClick: this.props.beginGame, className: "btn btn-primary btn-default" },
					!this.props.isGameRunning ? this.props.lives > 0 ? 'Begin Game' : 'Play Again' : 'Restart Game'
				),
				React.createElement(
					"div",
					{ id: "instruction" },
					!this.props.isGameRunning && 'Match as many cards as you can!'
				)
			);
		}
	}]);

	return Guide;
}(React.Component);

ReactDOM.render(React.createElement(CarduoApp, null), document.getElementById('app'));
