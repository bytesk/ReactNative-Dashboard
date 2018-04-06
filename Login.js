import React, { Component } from 'react';
import {Container, Header, 
  Content, Form, Item, 
  Input, Label, Button, Text, Icon, Left, Right, Title, Body
} from 'native-base';


import {View, TouchableHighlight, AsyncStorage} from 'react-native';
import { BackHandler } from 'react-native'

import { Actions } from 'react-native-router-flux';

  const ACCESS_TOKEN = 'access_token';

  export default class Login extends Component{
    constructor(props) {
      super(props);

      this.state = { 
        username: "",
        password: "",   
        error: "",
      };
    }
    componentWillUnmount () {
      BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
    }
    backAndroid () {
      Actions.login() // Return to previous screen
      return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
    }

    async componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid())
      console.log("ini didmount login");
      
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("token didmount login = "+token);


      if(token != "logout"){
        Actions.tab();
      } else {
        Actions.login();
      }
      
    }
    
    async storeToken(accessToken){
      try{
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      }catch(error){
        console.log("something went wrong store token login");
      }
    }

    async getToken(){
      try{
        let token =  await AsyncStorage.getItem(ACCESS_TOKEN);
        console.log("token is login : " + token);
      }catch(error){
        console.log("something went wrong login getToken login");
      }
    }

    async removeToken(){
      try{
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        this.getToken();
      }catch(error){
        console.log("something went wrong");
      }
    }
  
    async onLoginPressed() {
      this.setState({showProgress: true})
      try {
        let response = await fetch('https://test-mobile.neo-fusion.com/auth/login', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          'username': this.state.username,
                          'password': this.state.password,
                      })
                    });
        let res = await response.text();
        if (response.status >= 200 && response.status < 300) {
            //Handle success
            this.setState({error: ""});
            let accessToken = res;
            this.storeToken(accessToken);
            console.log("res token: " + accessToken);
            Actions.tab();
        } else {
            //Handle error
            let error = res;
            throw error;
        }
      } catch(error) {
          this.removeToken();
          this.setState({error: error});
          console.log("error " + error);
          this.setState({showProgress: false});
      }
    }

  handleUsername = (text) => {
      this.setState({ username: text })
   }

  handlePassword = (text) => {
      this.setState({ password: text })
   }
  

    render() {
     const isAuthenticated = this.getToken();
    //  {isAuthenticated ? 
    //   Actions.tab() :
    //   Actions.login()
    // }
      return (
        <Container style={{padding:20}}>
          <Content>
              <Form>
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input
                      ref={component => this.username = component}
                      autoFocus={true}
                      onChangeText={ this.handleUsername}
                    />
                  </Item>

                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input
                        ref={component => this.password = component}
                       secureTextEntry={true}
                       onChangeText={ this.handlePassword}
                    />
                </Item>

                <View style={{margin:20}} />
                  <Button primary full onPress={this.onLoginPressed.bind(this)}>
                    <Text> Log In </Text>
                  </Button>
                  <Text>
                      {this.state.error}
                  </Text>
              </Form>
          </Content>
        </Container>
      );
    }
  }