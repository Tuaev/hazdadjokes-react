import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  state = {
    jokes: []
  };

  componentDidMount = async () => {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      const res = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      });
      jokes.push(res.data.joke);
    }
    this.setState({ jokes: jokes });
  };

  render() {
    const jokes = this.state.jokes.map(joke => <div>{joke}</div>);
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
          <button className="JokeList-getmore">More Jokes</button>
        </div>
        <div className="JokeList-jokes">{jokes}</div>
      </div>
    );
  }
}

export default JokeList;
