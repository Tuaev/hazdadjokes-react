import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  state = {
    jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
    loading: false
  };

  componentDidMount = () => {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  };

  getJokes = async () => {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      const res = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      });
      jokes.push({ joke: res.data.joke, votes: 0, id: res.data.id });
    }

    this.setState(
      st => ({
        loading: false,
        jokes: [...st.jokes, ...jokes]
      }),
      () => {
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
      }
    );
  };

  handleVote = (id, delta) => {
    this.setState(
      st => ({
        jokes: st.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
      }),
      () => {
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
      }
    );
  };

  handleClick = () => {
    this.setState({ loading: true }, this.getJokes);
    // this.getJokes();
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }
    const jokes = this.state.jokes.map(joke => (
      <Joke
        votes={joke.votes}
        text={joke.joke}
        key={joke.id}
        upvote={() => this.handleVote(joke.id, 1)}
        downvote={() => this.handleVote(joke.id, -1)}
      />
    ));
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="laughing emoji"
          />
          <button className="JokeList-getmore" onClick={this.handleClick}>
            More Jokes
          </button>
        </div>
        <div className="JokeList-jokes">{jokes}</div>
      </div>
    );
  }
}

export default JokeList;
