import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	View,
	Button
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const gotoLogin = () => {
	Actions.login();
 }

 
const ACCESS_TOKEN = 'access_token';

export default class Main extends Component {
	constructor(props){
		super(props);

		this.state = {
			accessToken: this.props.accessToken
		}
	}


	onLogout(){
		Actions.login();
	}

	onLogout2(){
		this.removeToken();
	}

    async removeToken(){
      try{
				await AsyncStorage.removeItem(ACCESS_TOKEN);
				Actions.login();
      }catch(error){
        console.log("something went wrong logout");
      }
	}

	componentWillMount() {
		this.getToken();
	}

	async getToken(){
      try{
				let accessToken =  await AsyncStorage.getItem('ACCESS_TOKEN');
				if(!accessToken){
					console.log("token not set");
					Actions.login();
				}
				else
				{
					Actions.Main();
					console.log("token is main: " + token);
				}
      }catch(error){
        console.log("something went wrong in main");
      }
		}
	

	render() {
		const isAuthenticated = this.getToken();
		return (
			<ScrollView style={{padding: 20}}>
			  {!isAuthenticated ? 
          Actions.login() :
          Actions.main()
        }
				<Text 
					style={{fontSize: 27}}>
					Welcome {this.state.accessToken}
				</Text>
				<View style={{margin:20}} />
				<Button
					onPress = {this.onLogout2.bind(this)}
		            title="Logout"
		        />
		    </ScrollView>
        )
	}
}