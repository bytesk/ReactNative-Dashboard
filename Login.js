import React, { Component } from 'react';
import {Container, Header, 
  Content, Form, Item, 
  Input, Label, Button, Text
} from 'native-base';


export default class Login extends Component{
  render() {
    return (
      <Container>
        <Content>
            <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input />
                </Item>

                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input />
               </Item>

                <Button primary full>
                  <Text> Log In </Text>
                </Button>

            </Form>
        </Content>
      </Container>
    );
  }
}
