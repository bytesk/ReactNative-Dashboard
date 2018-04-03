import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	View,
	Button
} from 'react-native';

import { Actions } from 'react-native-router-flux';

const gotoLogin = () => {
	Actions.login()
 }

export default class Main extends Component {
	render() {
		return (
			<ScrollView style={{padding: 20}}>
				<Text 
					style={{fontSize: 27}}>
					Welcome
				</Text>
				<View style={{margin:20}} />
				<Button
					onPress = {gotoLogin}
		            title="Logout"
		        />
		    </ScrollView>
        )
	}
}