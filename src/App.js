import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home.js'
import Post from './pages/Post.js'
import Error from './pages/Error.js'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route strict path="/*/" component={Post} />
        <Route path="*" component={Error}></Route>
      </Switch>
    );
  }
}
export default App;
