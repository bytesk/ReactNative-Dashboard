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
          let token =  await AsyncStorage.removeItem('token');
          alert("sukses clear token");
        }catch(error){
          alert(error);
        }
      }




    async removeToken(){
        try{
          await AsyncStorage.removeItem('token');
          alert("sukses clear token");
        }catch(error){
          console.log("something went wrong");
        }
      }

    authClearStoragee(){
        return dispatch => {
            AsyncStorage.removeItem('token');
            alert("sukses clear token");
        }
    }

    logOut(){
        AsyncStorage.setItem('token', "")
      }

    getToken = async () => {
        try{
          let token =  await AsyncStorage.getItem('token');
          //alert(token);
          return token && token.length > 10;
        }catch(error){
          alert(error);
        }
      }
    
    async _userLogout() {
        try {
         // await AsyncStorage.removeItem('token');
          //this.logOut;
          //this.removeToken2();
          this.getToken();
          Actions.login();


        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
      }

    render(){
        const isAuthenticated = this.getToken();

        return(
            <Container>
	
        <Tabs initialPage={0}>
          <Tab heading="Home">
          {!isAuthenticated ? Actions.login() : 
                    <Main />
            }
          </Tab>
          <Tab heading="Profile">
          {!isAuthenticated ? Actions.login() : 
                    <Avatar />
            }
              
          </Tab>
          {!isAuthenticated ? Actions.login() : 
                <Tab heading="Logout" >
                    <Button primary full onPress={this._userLogout}>
                        <Text> Logout </Text>
                    </Button> 
                 </Tab>
            }

        </Tabs>
      </Container>
        );
    }
}
export default Tabss;