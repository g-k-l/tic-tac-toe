import React from "react";
import "./TicTacToe.css";
import { calculateWinner, range } from "./utils.js";
import SquareRenderer from "./assets/renderUtils.js";
import { MAX_BOARD_SIZE } from "./constants.js";

class Marker extends React.Component {
  render() {
    if (!this.props.src) {
      return null;
    }
    return <img className="marker" src={this.props.src} />;
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

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size,
      squares: Array(this.props.size * this.props.size).fill(null),
      xIsNext: true,
      winner: null
    };
  }

  renderRow(rowNumber) {
    let rowRangeArr = range(this.state.size);
    console.log(this.state.size);
    console.log(rowRangeArr);
    return (
      <div className="boardRow">
        {rowRangeArr.map(colNumber => this.renderSquare(rowNumber, colNumber))}
      </div>
    );
  }

  renderSquare(rowNumber, colNumber) {
    const squareNumber = rowNumber * this.state.size + colNumber;
    return (
      <Square
        value={SquareRenderer.asXO(this.state.squares[squareNumber])}
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

    const squares = this.state.squares.slice();
    if (this.state.squares[i] === null) {
      squares[i] = this.currentTurn();
    } else {
      alert("Square is taken =(");
      return;
    }

    const winner = calculateWinner(squares);

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: winner
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
    console.log(rangeArr);
    return (
      <div>
        <div className="status">{status}</div>
        {rangeArr.map(rowNumber => this.renderRow(rowNumber))}
      </div>
    );
  }
}

class ResetButton extends React.Component {
  constructor(props) {
    super(props);
  }

  // render() {

  // }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size
    };
  }
  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board size={this.state.size} />
          </div>
        </div>
        <div className="game-options">
          <input className="button" type="submit" value="Undo" />
          <input className="button" type="submit" value="Restart" />
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
      size: 3
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ size: event.target.value });
  }

  handleSubmit(event) {
    const input_size = parseInt(this.state.size);

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

  render() {
    if (this.state.started) {
      return <Game size={this.state.size} />;
    } else {
      return (
        <div className="game-setup">
          How big is the board?
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
          </form>
        </div>
      );
    }
  }
}

export default GameSetup;
