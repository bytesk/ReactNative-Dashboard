import React, { Component } from 'react';
import {
	ScrollView,
	View,
	TextInput,
	AsyncStorage,
	Image
} from 'react-native';
import {Container, Header, 
  Content, Form, Item, 
	Input, Label, Button, Text, 
	Icon, Left, Right, Title, Body,
	Card, CardItem, Thumbnail,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
export class Avatar extends React.Component{
    render(){
        return(
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                  <Image style={{width: 50, height: 50}} source={{uri: "http://fanaru.com/random/image/thumb/160391-random-seriously-face-avatar.jpg"}}/>
                                  <Text>John</Text>
                              </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    I'm the great John, duh !
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
export default Avatar;