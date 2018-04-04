import React, { Component } from 'react';
import {View, TouchableHighlight, AsyncStorage} from 'react-native';
import Login from './Login';
import Main from './Main';
import {
  StackNavigator,
} from 'react-navigation';  
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('auth')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
const App = StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Main: {
      screen: Main,
    },
  },
  {
    initialRouteName:isSignedIn ? 'Main':'Login',
  }
);
export default App;