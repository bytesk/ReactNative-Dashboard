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

export class Logout extends React.Component{
  componentDidMount(){
    this._userLogout();
    console.log(this.getToken);
  }
  getToken = async () => {
    try{
      let token =  await AsyncStorage.getItem('token');
      return token;
    }catch(error){
      console.log(error);
    }
  }
  removeToken = async () => {
    try{
      let token =  await AsyncStorage.removeItem('token');
      return token;
    }catch(error){
      console.log(error);
    }
  }
  async _userLogout() {
    try {
     // await AsyncStorage.removeItem('token');
      //this.logOut;
      this.removeToken();
      //this.getToken();
      Actions.login();


    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  

  render(){
    return <View />
  }
}

export class Tabss extends React.Component{
  componentDidMount(){
    console.log(this.getToken);
  }
  getToken = async () => {
    try{
      let token =  await AsyncStorage.getItem('token');
      return token;
    }catch(error){
      console.log(error);
    }
  }
  isAuthenticated = ()=>{
    if(this.getToken==null){
      return false;
    }else{
      return true;
    }
  }
    render(){
        
        return(
            <Container>
	
        <Tabs initialPage={0}>
          <Tab heading="Home">
          {!this.isAuthenticated ? <Logout /> : 
                    <Main />
            }
          </Tab>
          <Tab heading="Profile">
          {!this.isAuthenticated ? <Logout /> : 
                    <Avatar />
            }
              
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