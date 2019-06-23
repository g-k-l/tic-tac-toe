import React from "react";
import "./TicTacToe.css";
import { calculateWinner, range } from "./utils.js";
import SquareRenderer from "./assets/renderUtils.js";
import ModalConductor from "./modals/ModalConductor.js";
import { MAX_BOARD_SIZE, RESET_MODAL_NAME } from "./constants.js";

class Marker extends React.Component {
  render() {
    if (!this.props.src) {
      return null;
    }
    return (
      <img
        className="marker"
        src={this.props.src}
        alt="This square is taken!"
      />
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        <Marker src={this.props.value} />
      </button>
    );
  }
}

class OptionButton extends React.Component {
  render() {
    return (
      <input
        className="button"
        type="submit"
        value={this.props.name}
        onClick={this.props.handleClick}
      />
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size,
      squares: Array(this.props.size * this.props.size).fill(null),
      history: [],
      xIsNext: true,
      winner: null
    };
    this.handleUndo = this.handleUndo.bind(this);
  }

  renderRow(rowNumber) {
    let rowRangeArr = range(this.state.size);
    return (
      <div key={rowNumber} className="boardRow">
        {rowRangeArr.map(colNumber => this.renderSquare(rowNumber, colNumber))}
      </div>
    );
  }

  renderSquare(rowNumber, colNumber) {
    const squareNumber = rowNumber * this.state.size + colNumber;
    return (
      <Square
        key={squareNumber}
        value={SquareRenderer.renderValue(this.state.squares[squareNumber])}
        onClick={() => this.handleClick(squareNumber)}
      />
    );
  }

  currentTurn() {
    return this.state.xIsNext ? "X" : "O";
  }

  handleClick(i) {
    if (this.state.winner) {
      alert("Game is over!");
      return;
    }

    var updated_history = this.state.history.slice();

    const squares = this.state.squares.slice();
    if (this.state.squares[i] === null) {
      squares[i] = this.currentTurn();
      updated_history.push(i);
    } else {
      alert("Square is taken =(");
      return;
    }

    const winner = calculateWinner(squares);
    this.setState({
      squares: squares,
      history: updated_history,
      xIsNext: !this.state.xIsNext,
      winner: winner
    });
  }

  handleUndo(event) {
    if (this.state.winner) {
      alert("Game is over!");
      return;
    } else if (this.state.history.length === 0) {
      alert("No history to undo =\\");
    }
    var current_history = this.state.history.slice();
    const updated_history = this.state.history.slice(0, -1);

    const square_to_unset = current_history.pop();
    const squares = this.state.squares.slice();
    squares[square_to_unset] = null;

    this.setState({
      squares: squares,
      history: updated_history,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    let status;
    if (this.state.winner) {
      status = "Winner: ".concat(this.state.winner);
    } else {
      status = "Next player: ".concat(this.currentTurn());
    }
    let rangeArr = range(this.state.size);
    return (
      <div>
        <div className="status">{status}</div>
        {rangeArr.map(rowNumber => this.renderRow(rowNumber))}
        <div>
          <OptionButton handleClick={this.handleUndo} name="Undo" />
          <OptionButton handleClick={this.props.handleRestart} name="Restart" />
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size,
      modalName: null,
      modalAction: null
    };
    this.showGameResetModal = this.showGameResetModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showGameResetModal(event) {
    this.setState({
      modalName: RESET_MODAL_NAME,
      modalAction: this.props.handleGoBackToTop
    });
  }

  hideModal(event) {
    this.setState({
      modalName: null,
      modalAction: null
    });
  }

  render() {
    return (
      <div>
        <ModalConductor
          modalName={this.state.modalName}
          modalAction={this.state.modalAction}
          hideModal={this.hideModal}
        />
        <div className="game">
          <Board
            size={this.state.size}
            handleRestart={this.showGameResetModal}
          />
        </div>
      </div>
    );
  }
}

class GameSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      size: 3,
      modalName: null,
      modalAction: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBackToTop = this.goBackToTop.bind(this);

    this.handleSetIcons = this.handleSetIcons.bind(this);
    this.showSetIconsModal = this.showSetIconsModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleChange(event) {
    this.setState({ size: event.target.value });
  }

  handleSubmit(event) {
    const input_size = parseInt(this.state.size, 10);

    if (isNaN(input_size)) {
      alert("Please enter a number >:(");
      event.preventDefault();
      return;
    }

    if (input_size > MAX_BOARD_SIZE) {
      alert(
        "Board cannot be larger than " +
          MAX_BOARD_SIZE +
          " by " +
          MAX_BOARD_SIZE
      );
      event.preventDefault();
      return;
    }

    this.setState({ started: true, size: input_size });
    event.preventDefault();
  }

  goBackToTop() {
    this.setState({ started: false });
  }

  handleSetIcons(icons) {
    switch (icons) {
      case "xo":
        SquareRenderer.renderValue = SquareRenderer.asXO;
        break;
      case "phphack":
        SquareRenderer.renderValue = SquareRenderer.asPhpHack;
        break;
      case "reactangular":
        SquareRenderer.renderValue = SquareRenderer.asReactAngular;
        break;
      default:
        SquareRenderer.renderValue = SquareRenderer.asXO;
    }
  }

  showSetIconsModal(event) {
    this.setState({
      modalName: "SET_ICONS",
      modalAction: this.handleSetIcons
    });
  }

  hideModal(event) {
    this.setState({
      modalName: null,
      modalAction: null
    });
  }

  render() {
    if (this.state.started) {
      return (
        <div className="tic-tac-toe">
          <div class="bg"></div>
          <div className="game-header">
            <h1>Tic-Tac-Toe</h1>
          </div>
          <Game size={this.state.size} handleGoBackToTop={this.goBackToTop} />
        </div>
      );
    } else {
      return (
        <div className="tic-tac-toe">
          <div class="bg"></div>
          <div className="game-header">
            <h1>Tic-Tac-Toe</h1>
          </div>
          <div>
            <div className="game-setup">
              <ModalConductor
                modalName={this.state.modalName}
                modalAction={this.state.modalAction}
                hideModal={this.hideModal}
              />
              Please Select the Board Size
              <form onSubmit={this.handleSubmit}>
                <div className="board-size">
                  <input
                    className="text-box"
                    type="text"
                    value={this.state.size}
                    onChange={this.handleChange}
                  />
                  by
                  <input
                    className="text-box"
                    type="text"
                    value={this.state.size}
                    onChange={this.handleChange}
                  />
                </div>
                <input className="button" type="submit" value="Submit" />
                <input
                  className="button"
                  onClick={this.showSetIconsModal}
                  value="Set Icons"
                  readOnly
                />
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default GameSetup;
