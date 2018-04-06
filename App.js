import React, { Component } from 'react';
import {View, TouchableHighlight, AsyncStorage} from 'react-native';
import Login from './Login';
import Main from './Main';
import Tabss from './Tab';

import { Router, Scene } from 'react-native-router-flux'


export default class App extends Component {

  state = {
    isLoggedIn: false
  }

  render() {

    return(
        <Router>
          <Scene key = "root">
            <Scene key = "login" component = {Login} title = "Login" initial = {true}  renderBackButton = {() =>(Login)} />
            <Scene key = "tab" component = {Tabss} title = "Main" renderBackButton = {() =>(null)} />
          </Scene>
      </Router>
    )
  }
}
