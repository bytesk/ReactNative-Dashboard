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
	Footer, FooterTab, Tab, Tabs,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Main from './Main';
import Avatar from './Avatar';

const gotoLogin = () => {
    removeToken();
	Actions.login()
 }


 
export class Tabss extends React.Component{

    componentDidMount(){
        this.removeToken();
        Actions.login();
    }

    async removeToken(){
        try{
            Actions.login();
            console.log("token is remove login" + this.getToken())
            await AsyncStorage.removeItem(ACCESS_TOKEN);
        }catch(error){
            console.log("something went wrong");
        }
    }

    render(){
        return(
            <Container>
        <Tabs initialPage={0}>
          <Tab heading="Home">
              <Main />
          </Tab>
          <Tab heading="Profile">
              <Avatar />
          </Tab>
          <Tab heading="Logout" >
              <Card>
                  <CardItem>
            <Button full >
                <Text>Logout</Text>
            </Button>
            </CardItem>
            </Card>
          </Tab>
        </Tabs>
      </Container>
        );
    }
}
export default Tabss;