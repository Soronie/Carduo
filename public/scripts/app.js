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

		_this.handleCount = _this.handleCount.bind(_this);
		_this.state = {
			count: 0,
			gameRunning: false
		};
		return _this;
	}

	_createClass(CarduoApp, [{
		key: "handleCount",
		value: function handleCount(inc) {
			this.setState(function (prevState) {
				return {
					count: prevState.count + inc
				};
			});

			this.setState(function (prevState) {
				return {
					gameRunning: prevState.count < 16 ? true : false
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
						React.createElement(Cards, { handleCount: this.handleCount }),
						React.createElement(Guide, null)
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

		var _this2 = _possibleConstructorReturn(this, (Cards.__proto__ || Object.getPrototypeOf(Cards)).call(this, props));

		_this2.handleSelected = _this2.handleSelected.bind(_this2);
		_this2.types = ["fire", "gamepad", "shield", "chain-broken", "leaf", "music", "smile-o", "heart"];

		var pos = _this2.generateRandomPositions();
		var selected = Array(16).fill(false);

		_this2.state = {
			positions: pos,
			selected: selected,
			first: undefined
		};
		return _this2;
	}

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
			var _this3 = this;

			console.log(card.id + " " + card.className);
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
				this.setState(function (prevState) {
					var selected = prevState.selected.slice();

					if (_this3.state.first.className === card.className) {
						selected[card.id] = true;
					} else {
						selected[_this3.state.first.id] = false;
					}

					return {
						selected: selected,
						first: undefined
					};
				});
			}

			return false;
		}
	}, {
		key: "render",
		value: function render() {
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

		var _this4 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this4.handleSelected = _this4.handleSelected.bind(_this4);
		return _this4;
	}

	_createClass(Card, [{
		key: "handleSelected",
		value: function handleSelected(e) {
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

		var _this5 = _possibleConstructorReturn(this, (Guide.__proto__ || Object.getPrototypeOf(Guide)).call(this, props));

		_this5.state = {
			lives: 5
		};
		return _this5;
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
						this.state.lives
					)
				),
				React.createElement(
					"button",
					{ className: "btn btn-primary btn-default" },
					"Begin Game"
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
