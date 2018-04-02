import React, { Component } from 'react';

import Login from './Login';
import Main from './Main';

export default class App extends Component {

  state = {
    isLoggedIn: false
  }

  render() {

    if (this.state.isLoggedIn) 
      return <Main 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
        />;
    else 
      return <Login 
          onLoginPress={() => this.setState({isLoggedIn: true})}
        />;
  }

}