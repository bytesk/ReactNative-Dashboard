import React, { Component } from 'react';
import {View, TouchableHighlight, AsyncStorage} from 'react-native';
import Login from './Login';
import Main from './Main';

import { Router, Scene } from 'react-native-router-flux'


export default class App extends Component {

  state = {
    isLoggedIn: false
  }

  render() {

    return(
        <Router>
          <Scene key = "root">
            <Scene key = "login" component = {Login} title = "Login" initial = {true} />
            <Scene key = "main" component = {Main} title = "Main" />
          </Scene>
      </Router>
    )
  }
}
