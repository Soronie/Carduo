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
		_this.incrementScore = _this.incrementScore.bind(_this);
		_this.handleSelectedCard = _this.handleSelectedCard.bind(_this);
		_this.title = 'Carduo';
		_this.initialLives = 10;
		_this.types = ["fire", "gamepad", "shield", "chain-broken", "leaf", "music", "smile-o", "heart"];
		_this.totalCards = _this.types.length * 2;
		_this.state = {
			positions: [],
			selected: [],
			colors: [],
			isGameRunning: false,
			isGameLoading: false,
			matchedCards: 0,
			score: 0,
			lives: _this.initialLives
		};
		return _this;
	}

	// Generate random numbers between [0, 15] within an array


	_createClass(CarduoApp, [{
		key: "generateRandomPositions",
		value: function generateRandomPositions() {
			var arr = [];

			while (arr.length < this.totalCards) {
				var randomNumber = Math.floor(Math.random() * this.totalCards);
				if (arr.indexOf(randomNumber) === -1) arr[arr.length] = randomNumber;
			}

			return arr;
		}

		// Called whenever two cards are selected

	}, {
		key: "updateLives",
		value: function updateLives(decrementLife) {
			var _this2 = this;

			// If the cards mismatch, decrementLiferement the player's lives
			if (decrementLife) {
				this.setState(function (prevState) {
					return {
						lives: prevState.lives - 1
					};
				},
				// If the player has 0 lives remaining, stop the game
				function () {
					if (_this2.state.lives === 0) {
						_this2.stopGame();
						// Reveal all the cards to the player
						$('.fa:not(.lives)').animate({ opacity: 1 }, 500);
					}
				});
			}
		}
	}, {
		key: "incrementScore",
		value: function incrementScore() {
			var _this3 = this;

			// Increase score by one and matched cards by 2
			this.setState(function (prevState) {
				return {
					score: prevState.score + 1,
					matchedCards: prevState.matchedCards + 2
				};
			}, function () {
				// If all the cards are matched, restart a new round
				if (_this3.state.matchedCards === _this3.totalCards) {
					_this3.stopGame();
					setTimeout(function () {
						_this3.beginGame();
					}, 1000);
				}
			});
		}
	}, {
		key: "stopGame",
		value: function stopGame() {
			var _this4 = this;

			// After a round is completed, either restart a new round or stop
			this.setState(function () {
				return {
					isGameRunning: _this4.state.lives > 0 ? true : false,
					selected: Array(_this4.totalCards).fill(false)
				};
			});
		}

		// Game begins when the player presses the button

	}, {
		key: "beginGame",
		value: function beginGame() {
			var _this5 = this;

			if (this.state.isGameLoading) return;
			var pos = this.generateRandomPositions();
			var col = this.generateRandomColors();
			var sel = Array(this.totalCards).fill(false);
			var restart = !(this.state.matchedCards === this.totalCards);
			$('.fa:not(.lives)').parent().removeClass('selected');
			this.setState(function () {
				return {
					positions: pos,
					colors: col,
					selected: sel,
					isGameRunning: false,
					isGameLoading: true,
					score: restart ? 0 : _this5.state.score,
					lives: restart ? _this5.initialLives : _this5.state.lives,
					matchedCards: 0
				};
			}, function () {
				// Briefly reveal the cards to the player, which fade over time
				$('.fa:not(.lives)').parent().animate({ opacity: 1 }, 500);
				$('.fa:not(.lives)').animate({ opacity: 1 }, 100);
				$('.fa:not(.lives)').animate({ opacity: 0 }, 5000, function () {
					_this5.setState(function () {
						return {
							isGameRunning: true,
							isGameLoading: false
						};
					});
				});
			});
		}
	}, {
		key: "generateRandomColors",
		value: function generateRandomColors() {
			// Generate random colors for the given card set
			var arr = [];
			for (var i = 0; i < this.totalCards / 2; i++) {
				var matchedCards = 0;
				var intensities = [];
				while (intensities.length < 3) {
					intensities.push(Math.floor(Math.random() * 256 - 64));
				}
				arr.push("rgb(" + intensities[0] + ", " + intensities[1] + ", " + intensities[2]);
			}
			return arr;
		}
	}, {
		key: "handleSelectedCard",
		value: function handleSelectedCard(selectedCards) {
			// Update selected state for the cards
			this.setState(function () {
				return {
					selected: selectedCards
				};
			});
		}
	}, {
		key: "render",
		value: function render() {
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
							positions: this.state.positions,
							colors: this.state.colors,
							selected: this.state.selected,
							types: this.types,
							lives: this.state.lives,
							totalCards: this.totalCards,
							isGameRunning: this.state.isGameRunning,
							updateLives: this.updateLives,
							incrementScore: this.incrementScore,
							handleSelectedCard: this.handleSelectedCard
						}),
						React.createElement(Guide, {
							beginGame: this.beginGame,
							lives: this.state.lives,
							isGameRunning: this.state.isGameRunning,
							score: this.state.score
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

		var _this6 = _possibleConstructorReturn(this, (Cards.__proto__ || Object.getPrototypeOf(Cards)).call(this, props));

		_this6.handleSelectedCard = _this6.handleSelectedCard.bind(_this6);

		// first: the first card picked to see if second selection matches
		_this6.state = {
			first: undefined
		};
		return _this6;
	}

	_createClass(Cards, [{
		key: "handleSelectedCard",
		value: function handleSelectedCard(card) {
			// If the card is selected when the game isn't running, return
			if (!this.props.isGameRunning) return;

			$("#" + card.id).parent().addClass('selected');
			var selected = this.props.selected;

			$("#" + card.id).animate({ opacity: 1 }, 100);
			// If the card is the first one picked or the game has restarted, store its value
			if (!this.state.first || this.props.selected.indexOf(true) === -1) {
				this.setState(function () {
					return {
						first: card
					};
				});
				selected[card.id] = true;
			} else {
				// The second card was picked, so see if it matches first
				this.setState(function () {
					// Refresh first after a mis/match
					return {
						first: undefined
					};
				});

				var decrementLife = false;

				// The cards match
				if (this.state.first.className === card.className) {
					// Make first and second cards fade
					$("#" + this.state.first.id).parent().fadeTo(750, 0);
					$("#" + card.id).parent().fadeTo(750, 0);

					// Mark second card as selected, then increment score
					selected[card.id] = true;
					this.props.incrementScore();
				} else {
					// The cards mismatch
					//De-select the first card for the next attempt
					//Decrement life
					selected[this.state.first.id] = false;
					decrementLife = true;

					// Remove selected state from card elements
					$("#" + this.state.first.id).parent().removeClass('selected');
					$("#" + card.id).parent().removeClass('selected');

					// Don't fade out the last two selected cards when the player is on their last life
					if (this.props.lives > 1) {
						$("#" + this.state.first.id).animate({ opacity: 0 }, 750);
						$("#" + card.id).animate({ opacity: 0 }, 750);
					}
				}

				// decrementLife is true when there is a mismatch; false otherwise
				this.props.updateLives(decrementLife);
				// update selected states for cards
				this.props.handleSelectedCard(selected);
			}
		}
	}, {
		key: "render",
		value: function render() {
			// Produce all cards on the app given random colors, positions, and selected states
			var cards = [];
			for (var i = 0; i < this.props.totalCards; i++) {
				cards.push(React.createElement(Card, {
					type: this.props.types[this.props.positions[i] % this.props.types.length],
					index: i,
					handleSelectedCard: this.handleSelectedCard,
					selected: this.props.selected[i],
					color: this.props.colors[this.props.positions[i] % this.props.types.length],
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

		var _this7 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this7.handleSelectedCard = _this7.handleSelectedCard.bind(_this7);
		return _this7;
	}

	_createClass(Card, [{
		key: "handleSelectedCard",
		value: function handleSelectedCard(e) {
			// If the item has not been selected before, possibly mark it as selected
			if (!this.props.selected) {
				this.props.handleSelectedCard(e.target);
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "col-xs-3 card" },
				React.createElement("i", { id: this.props.index,
					onClick: this.handleSelectedCard,
					className: "fa fa-" + this.props.type,
					"aria-hidden": "true",
					style: { backgroundColor: this.props.color } })
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
						this.props.score
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
					"Match as many cards as you can!"
				)
			);
		}
	}]);

	return Guide;
}(React.Component);

ReactDOM.render(React.createElement(CarduoApp, null), document.getElementById('app'));
