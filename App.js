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
          <Scene key = "root" renderLeftButton={()=>(null)}>
            <Scene key = "login" component = {Login} title = "Login" initial = {true} />
            <Scene key = "tab" component = {Tabss} title = "Main" />
          </Scene>
      </Router>
    )
  }
}
