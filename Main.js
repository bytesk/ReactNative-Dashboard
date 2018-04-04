import React, { Component } from 'react';
import {
	View
} from 'react-native';
import {Container, Header, 
	Content, Form, Item, 
	Input, Label, Button, Text, Icon, Left, Right, Title, Body
  } from 'native-base';

export default class Main extends Component {
	render() {
		
		return (
			<Container style={{padding: 20}}>
			<Header>
          <Left/>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
		<Content>
				<Text 
					style={{fontSize: 27}}>
					Welcome
				</Text>
				<Button onPress={this.props.onLogoutPress}>
				<Text> Log Out </Text>
				</Button>
			</Content>
		    </Container>
        )
	}
}