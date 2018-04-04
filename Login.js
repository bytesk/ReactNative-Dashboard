import React, { Component } from 'react';
import {Container, Header, 
  Content, Form, Item, 
  Input, Label, Button, Text, Icon, Left, Right, Title, Body
} from 'native-base';
import { StackNavigator } from 'react-navigation';

import {View, TouchableHighlight, AsyncStorage} from 'react-native';

  export default class Login extends Component{
    constructor(props){
      super(props);
      this.state={
        isLoggedIn: false,
        username: '',
        password: '',
        accessToken: ''
      };
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
    onChangeUsername(event){
      this.setState({
        username: event.target.value,
      });
    }
    onChangePassword(event){
      this.setState({
        password: event.target.value,
      });
    }
  
    handleClick(){
      if(this.state.username=='john'&&this.state.password=='123456'){
        this.setState({
                isLoggedIn: true
              });
              AsyncStorage.setItem('auth', 'true');
            }
  
            fetch('https://test-mobile.neo-fusion.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'username': 'john',
            'password': '123456',
      })
      
    }).then((response) => response.json())
    .then((data) => {
      AsyncStorage.setItem('access', JSON.stringify(data).substring(17,53))
    })
    .catch((error) => {
      console.error(error);

    });
    
    }
    isAuthenticated() {
      const token =  AsyncStorage.getItem('access');
      return token && token.length > 10;
  }
  

    render() {
      return (
        <Container style={{padding:20}}>
        <Header>
          <Left/>
            <Body>
              <Title>Login</Title>
            </Body>
          <Right />
        </Header>

          <Content>
              <Form>
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input
                      ref={component => this.username = component}
                      autoFocus={true}
                      onChangeText={()=>this.onChangeUsername}
                    />
                  </Item>

                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input
                     	 ref={component => this.password = component}
                       secureTextEntry={true}
                       onChangeText={()=>this.onChangePassword}
                    />
                </Item>

                <View style={{margin:20}} />
                <Button primary full onPress={this.handleClick}>
                    <Text> Log In </Text>
                  </Button>
                  
              </Form>
          </Content>
        </Container>
      );
    }
  }