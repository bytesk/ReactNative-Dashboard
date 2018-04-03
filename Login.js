import React, { Component } from 'react';
import {Container, Header, 
  Content, Form, Item, 
  Input, Label, Button, Text, Icon, Left, Right, Title, Body
} from 'native-base';


import {View} from 'react-native';

  state = {
    username: '',
    password: '',
    isLoggingIn: false,
    message: ''
  }

  _userLogin = () => {
    this.setState({ isLogginIn: true, message: ''});

    var params = {
      username: this.state.username,
      password: this.state.password
    }

      if(this.state.username=='john'&&this.state.password=='123456'){
        this.setState({
                isLoggedIn: true
              });
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
    .then((response) => {
      if (response.status==200) proceed = true;
      else this.setState({ message: response.message });
  })
    .then(() => {
        this.setState({ isLoggingIn: false })
        if (proceed) this.props.onLoginPress();
    })
    .catch(err => {
    this.setState({ message: err.message });
    this.setState({ isLoggingIn: false })
    });
  }

  export default class Login extends Component{


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
                      ref={component => this._username = component}
                      autoFocus={true}
                      onFocus={this.clearUsername}
                    />
                  </Item>

                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input
                     	 ref={component => this._password = component}
                       secureTextEntry={true}
                       onFocus={this.clearPassword}
                       onSubmitEditing={this._userLogin}
                    />
                </Item>


                <View style={{margin:20}} />
                  <Button primary full onPress={this._userLogin}>
                    <Text> Log In </Text>
                  </Button>

              </Form>
          </Content>
        </Container>
      );
    }
  }