import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Post from './pages/Post.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route strict path="/*/" component={Post} />
      </div>
    );
  }
}
export default App;
