import React, { Component } from 'react';
import {
	ScrollView,
	View,
	TextInput,
	AsyncStorage,
	Image,
	StyleSheet
} from 'react-native';

import {Container, Header, 
  Content, Form, Item, 
	Input, Label, Button, Text, 
	Icon, Left, Right, Title, Body,
	Card, CardItem, Thumbnail,
	Footer, FooterTab, Tab, Tabs,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
var ImagePicker = require('react-native-image-picker');

const ACCESS_TOKEN = 'access_token';
const gotoLogin = () => {
	Actions.login();
 }
 var options = {
	title: 'Pick an Image',
	storageOptions: {
	  skipBackup: true,
	  returnBase64Image: true,
	}
  };

export default class Main extends Component {
	constructor(props){
		super(props);
		this.state = {
				tweets: [],
				file:"null",
				tweet: '',
				people: [],
				pickedImaged: ''
		};
		this.pickImageHandler = this.pickImageHandler.bind(this);
		this.onChangeTweet = this.onChangeTweet.bind(this);
		this.getTweets = this.getTweets.bind(this);
	}

	pickImageHandler = () => {
		ImagePicker.showImagePicker(options, (response) => {
			if(response.didCancel){
				console.log("User cancelled");
			}
			else if(response.error){
				console.log("Error", response.error);
			}
			else{
				let source = response.uri;
				this.setState({
					pickedImaged: source
				  });
				  console.log(this.state.pickedImaged);
			}
		});
	}
	
	getTweets(){
		fetch('https://test-mobile.neo-fusion.com/data', {
				method: 'GET',
				headers: {
					'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
					//'Access-Token': AsyncStorage.getItem('token')
					//'Access-Token': localStorage.getItem('access'),
					//'Access-Token': this.getToken
				}
	}).then(results => results.json()).then(data => {let tweets = data.map((item)=>{
				return(
						<View>
					<Card>
						<CardItem header>
							<Left>
							<Image style={{width: 50, height: 50}} source={{uri: "http://fanaru.com/random/image/thumb/160391-random-seriously-face-avatar.jpg"}}/>
							<Body>
							<Text>John</Text>
							<Text note>john</Text>
							</Body>
							</Left>
						</CardItem>
						<CardItem cardBody>
							<Image style={{width: 50, height: 50}} source={{uri: item.thumbnail_url}}/>
							<Body>
								<Text>
									{item.summary}
								</Text>
							</Body>
						</CardItem>
					</Card>
				</View>
				);
		});
		this.setState({
				tweets: tweets,
		});
}).catch((error) => {
		console.error(error);
	});
	this.setState(({tweet: ""}));

}
componentDidMount() {
	this.getTweets();
	
}

onChangeTweet(e){
	this.setState({tweet: e.target.value});
}

getToken = async () => {
	try{
	  let token =  await AsyncStorage.getItem('token');
	  alert(token);
	}catch(error){
	  alert(error);
	}
  }

handleSubmit(e){
	console.log(this.state.pickedImaged);
	const image = {
		uri: this.state.pickedImaged,
		type: 'image/jpeg',
		name: 'photo.jpg',
	};
	console.log(image.uri);
	let form = new FormData();
	form.append("file", image);
	console.log( form.get('file'));
	fetch('http://test-mobile.neo-fusion.com/data/create', {
			method: 'POST',
			headers: {
				//'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
				'Access-Token': this.getToken
			},
			body: form,
}).then((response) => response.json())
.then((data)=> {
		console.log(data);
		
			fetch('https://test-mobile.neo-fusion.com/data/'+data.id+'/update', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						//'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
						//'Access-Token': AsyncStorage.getItem('token')
						'Access-Token': this.getToken
					},
					body: JSON.stringify({
							'summary': this.state.tweet,
							'detail': this.state.tweet,
				})
		}).then(response => response.json()).then((data =>{
				this.getTweets();
		}))
}).catch((error) => {
	console.error(error);
});

	e.preventDefault();
}


	render() {
		const isAuthenticated = this.getToken();
		{!isAuthenticated ? 
			Actions.login() :
			Actions.tab()
		  }
		return (
			<Container style={{padding: 20}}>
									
						<View>
							<Image source={{uri: this.state.pickedImaged}} style={styles.previewImage}  />
						</View>
				<Content>
					<Form>

						<Button title = "Pick Image" onPress = {this.pickImageHandler}>
							<Text> pick </Text>
						</Button>

						<Button onPress = {this.getToken}>
							<Text> TKN </Text>
						</Button>

						<TextInput style = {styles.twit} multiline={true} placeholder="What's Happening ?" autoGrow={true} maxLength={150} onChange={()=>this.onChangeTweet}/>
						<Button style = {styles.btnTwit} onPress={this.handleSubmit} full>
              <Text>TWIT</Text>
         		 </Button> 

		

				  
  

					</Form>
					{this.state.tweets}
				</Content>
		  </Container>
      )
	}
}


const styles = StyleSheet.create({
	twit: {
		marginBottom:20,
	},
	btnTwit: {
		marginBottom: 20
	},
	previewImage: {
		width: "50%",
		height: "50%"
	}
})