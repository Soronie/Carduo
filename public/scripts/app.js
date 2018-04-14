'use strict';

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
		_this.handleChange = _this.handleChange.bind(_this);
		_this.state = {
			positions: [],
			selected: [],
			colors: [],
			gameRunning: false,
			gameLoading: false,
			count: 0,
			score: 0,
			lives: 10
		};
		return _this;
	}

	// Generate random numbers between [0, 15] within an array


	_createClass(CarduoApp, [{
		key: 'generateRandomPositions',
		value: function generateRandomPositions() {
			var arr = [];

			while (arr.length < 16) {
				var randomNumber = Math.floor(Math.random() * 16);
				if (arr.indexOf(randomNumber) === -1) arr[arr.length] = randomNumber;
			}

			return arr;
		}

		// Called whenever two cards are selected

	}, {
		key: 'updateLives',
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
						_this2.stopGame();
						$('.fa:not(lives)').animate({ opacity: 1 }, 500);
					}
				});
			}
		}
	}, {
		key: 'incrementScore',
		value: function incrementScore() {
			var _this3 = this;

			this.setState(function (prevState) {
				return {
					score: prevState.score + 1,
					count: prevState.count + 2
				};
			}, function () {
				if (_this3.state.count === 16) {
					_this3.stopGame();
					setTimeout(function () {
						_this3.beginGame();
					}, 1000);
				}
			});
		}
	}, {
		key: 'stopGame',
		value: function stopGame() {
			var _this4 = this;

			this.setState(function () {
				return {
					gameRunning: _this4.state.lives > 0 ? true : false,
					selected: Array(16).fill(false)
				};
			});
		}

		// Game begins when the player presses the button

	}, {
		key: 'beginGame',
		value: function beginGame() {
			var _this5 = this;

			if (this.state.gameLoading) return;
			var pos = this.generateRandomPositions();
			var col = this.generateRandomColors();
			var sel = Array(16).fill(false);
			this.setState(function () {
				return {
					positions: pos,
					colors: col,
					selected: sel,
					gameRunning: false,
					gameLoading: true,
					score: _this5.state.count === 16 ? _this5.state.score : 0,
					lives: _this5.state.count === 16 ? _this5.state.lives : 10,
					count: 0
				};
			}, function () {
				$('.fa:not(.lives)').parent().animate({ opacity: 1 }, 500);
				$('.fa:not(.lives)').animate({ opacity: 1 }, 100);
				$('.fa:not(.lives)').animate({ opacity: 0 }, 5000, function () {
					_this5.setState(function () {
						return {
							gameRunning: true,
							gameLoading: false
						};
					});
				});
			});
		}
	}, {
		key: 'generateRandomColors',
		value: function generateRandomColors() {
			var arr = [];
			for (var i = 0; i < 8; i++) {
				var count = 0;
				var intensities = [];
				while (intensities.length < 3) {
					intensities.push(Math.floor(Math.random() * 256 - 64));
				}
				arr.push('rgb(' + intensities[0] + ', ' + intensities[1] + ', ' + intensities[2]);
			}
			return arr;
		}
	}, {
		key: 'handleChange',
		value: function handleChange(selectedCards) {
			this.setState(function () {
				return {
					selected: selectedCards
				};
			});
		}
	}, {
		key: 'render',
		value: function render() {
			this.title = 'Carduo';
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					this.title
				),
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'div',
						{ className: 'row' },
						React.createElement(Cards, {
							isGameRunning: this.state.gameRunning,
							updateLives: this.updateLives,
							lives: this.state.lives,
							positions: this.state.positions,
							incrementScore: this.incrementScore,
							colors: this.state.colors,
							handleChange: this.handleChange,
							selected: this.state.selected }),
						React.createElement(Guide, {
							beginGame: this.beginGame,
							lives: this.state.lives,
							isGameRunning: this.state.gameRunning,
							score: this.state.score })
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

		_this6.handleSelected = _this6.handleSelected.bind(_this6);
		_this6.types = ["fire", "gamepad", "shield", "chain-broken", "leaf", "music", "smile-o", "heart"];

		// first: the first card picked to see if second selection matches
		_this6.state = {
			first: undefined
		};
		return _this6;
	}

	_createClass(Cards, [{
		key: 'handleSelected',
		value: function handleSelected(card) {
			var _this7 = this;

			// If the card is selected when the game isn't running, return
			if (!this.props.isGameRunning || this.props.selected[card.id]) return;

			$('#' + card.id).animate({ opacity: 1 }, 100);
			// If the card is the first one picked or the game has restarted, store its value
			if (!this.state.first || this.props.selected.indexOf(true) === -1) {
				this.setState(function () {
					var selected = _this7.props.selected.slice();
					selected[card.id] = true;
					_this7.props.handleChange(selected);
					return {
						first: card
					};
				});
			} else {
				// The second card was picked, so see if it matches first
				this.setState(function () {
					var dec = false;
					var selected = _this7.props.selected;

					// If the cards match, mark the second card as selected
					if (_this7.state.first.className === card.className) {
						$('#' + _this7.state.first.id).parent().fadeTo(750, 0);
						$('#' + card.id).parent().fadeTo(750, 0);
						selected[card.id] = true;
						_this7.props.incrementScore();
					} else {
						// The cards mismatch, so de-select the first card for the next attempt
						selected[_this7.state.first.id] = false;
						dec = true;

						// Don't fade out the last two selected cards when the player is on their last life
						if (_this7.props.lives > 1) {
							$('#' + _this7.state.first.id).animate({ opacity: 0 }, 750);
							$('#' + card.id).animate({ opacity: 0 }, 750);
						}
					}

					// dec is true when there is a mismatch; false otherwise
					_this7.props.updateLives(dec);
					_this7.props.handleChange(selected);

					// Refresh first after a mis/match
					return {
						first: undefined
					};
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			// Produce 16 cards on the app
			var cards = [];
			for (var i = 0; i < 16; i++) {
				cards.push(React.createElement(Card, { type: this.types[this.props.positions[i] % 8], index: i,
					handleSelected: this.handleSelected,
					selected: this.props.selected[i],
					color: this.props.colors[this.props.positions[i] % 8],
					key: i
				}));
			}

			return React.createElement(
				'div',
				{ id: 'left', className: 'col-xs-6 half' },
				React.createElement(
					'div',
					{ className: 'row' },
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

		var _this8 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this8.handleSelected = _this8.handleSelected.bind(_this8);
		return _this8;
	}

	_createClass(Card, [{
		key: 'handleSelected',
		value: function handleSelected(e) {
			// If the item has not been selected before, possibly mark it as selected
			if (!this.props.selected) {
				this.props.handleSelected(e.target);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ onClick: this.handleSelected, className: 'col-xs-3 card' },
				React.createElement('i', { id: this.props.index,
					className: "fa fa-" + this.props.type,
					'aria-hidden': 'true',
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
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'right', className: 'col-xs-6 half' },
				React.createElement(
					'div',
					null,
					React.createElement(
						'h2',
						null,
						'Score'
					),
					React.createElement(
						'h2',
						{ id: 'score' },
						this.props.score
					)
				),
				React.createElement(
					'div',
					null,
					React.createElement(
						'i',
						{ className: 'fa fa-heart-o lives', 'aria-hidden': 'true' },
						' x '
					),
					React.createElement(
						'span',
						{ id: 'lives' },
						this.props.lives
					)
				),
				React.createElement(
					'button',
					{ onClick: this.props.beginGame, className: 'btn btn-primary btn-default' },
					!this.props.isGameRunning ? this.props.lives > 0 ? 'Begin Game' : 'Play Again' : 'Restart Game'
				),
				React.createElement(
					'div',
					{ id: 'instruction' },
					'Match as many cards as you can!'
				)
			);
		}
	}]);

	return Guide;
}(React.Component);

ReactDOM.render(React.createElement(CarduoApp, null), document.getElementById('app'));
