import React, { Component } from 'react';
import axios from 'axios';

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
        <h1>JokesList</h1>
        <div className="JokeList-jokes">{jokes}</div>
      </div>
    );
  }
}

export default JokeList;
