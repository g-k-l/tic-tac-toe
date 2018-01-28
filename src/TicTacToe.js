import React from 'react';
import './TicTacToe.css';
import {calculateWinner} from './utils.js';
import SquareRenderer from './assets/renderUtils.js'


class Marker extends React.Component {
  render() {

      if (!this.props.src) {
        return null
      }
      return (
        <img className="marker" src={this.props.src}></img>
      );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
      <Marker src={this.props.value}/>
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null
    };
  }

  renderSquare(i) {
    return (
      <Square 
        value={SquareRenderer.asXO(this.state.squares[i])}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  currentTurn() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  handleClick(i) {

    if (this.state.winner) {
      alert("Game is over!")
      return
    }

    const squares = this.state.squares.slice();
    if (this.state.squares[i] === null) {
      squares[i] = this.currentTurn();  
    } else {
      alert("Square is taken =(")
      return
    }

    const winner = calculateWinner(squares)
    
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: winner
    });
  }

  render() {;
    let status;
    if (this.state.winner) {
      status = "Winner: ".concat(this.state.winner);
    } else {
      status = 'Next player: '.concat(this.currentTurn());
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board/>
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
    this.setState({size: event.target.value});
  }

  handleSubmit(event) {
    this.setState({started: true});
    event.preventDefault();
  }

  render() {
    if (this.state.started) {
      return <Game />
    } else {
      return (
        <div className="game-setup">
        How big is the board?
          <form onSubmit={this.handleSubmit}>
            <div class="board-size">
              <input class="text-box" type="text" value={this.state.size} onChange={this.handleChange}/>
              by
              <input class="text-box" type="text" value={this.state.size} onChange={this.handleChange}/>
            </div>
            <input class="button" type="submit" value="Submit"/>
          </form>
        </div>
      );  
    }
  }
}

export default GameSetup;

