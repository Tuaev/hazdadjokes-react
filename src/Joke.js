import React, { Component } from 'react';
import { getColor, getEmoji } from './JokeHelper';

import './Joke.css';
class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
          <span className="Joke-votes" style={{ borderColor: getColor(this.props.votes) }}>
            {this.props.votes}
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
        </div>
        <div className="Joke-text">{this.props.text}</div>
        <div className="Joke-smiley">
          <i className={getEmoji(this.props.votes)} />
        </div>
      </div>
    );
  }
}
export default Joke;
