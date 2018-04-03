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
  }

  export default class Login extends Component{


    render() {
      return (
        <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
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


                <View style={{margin:15}} />
                  <Button primary full onPress={this.props.onLoginPress}>
                    <Text> Log In </Text>
                  </Button>

              </Form>
          </Content>
        </Container>
      );
    }
  }