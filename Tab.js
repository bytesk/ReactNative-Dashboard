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
  this.removeToken();
  Actions.login();
}



    async removeToken(){
        try{
          await AsyncStorage.removeItem('token');
        }catch(error){
          console.log("something went wrong");
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

    removeToken2 = async () => {
        try{
            this.getToken;
            await AsyncStorage.removeItem('token');
            alert("sukses clear token");
            Actions.login();
            this.getToken;
        }catch(error){
          alert(error);
        }
      }

    authClearStoragee(){
        return dispatch => {
            AsyncStorage.removeItem('token');
            alert("sukses clear token");
            Actions.login();
        }
    }

    logOut(){
        AsyncStorage.setItem('token', "")
      }

    getToken = async () => {
        try{
          let token =  await AsyncStorage.getItem('token');
          alert(token);
          return token;
        }catch(error){
          alert(error);
        }
      }
      isAuthenticated = () =>{
        if(this.getToken==''){
          return false;
        }else if(this.getToken==null){
          return false;
        }else{
          return true;
        }
      }
    render(){

        return(
            <Container>
            {!this.isAuthenticated ? 
			Actions.login() :
	
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
        	  }
      </Container>
        );
    }
}
export default Tabss;