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

import { Router, Scene } from 'react-native-router-flux'


const ACCESS_TOKEN = 'access_token';

export class Logout extends React.Component{
    componentDidMount(){
        console.log("did mount logout");
        this.removeToken();
        Actions.login();
    }

    async removeToken(){
      try{
        await AsyncStorage.setItem(ACCESS_TOKEN, "logout");
      }catch(error){
        console.log("something went wrong store token login");
      }
    }

    render(){
        return(
            <View>
            </View>
        );
    }
}
export class Tabss extends React.Component{

    componentDidMount(){
        this.checkLogin();
    }
    async checkLogin(){
    AsyncStorage.getItem('token').then((val) =>{
      console.log("token di main = "+val);
    });
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
                    <Logout />
                </Tab>
            </Tabs>
        </Container>
        );
    }
}
export default Tabss;