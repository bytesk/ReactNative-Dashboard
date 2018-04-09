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

let ACCESS_TOKEN = AsyncStorage.getItem('token');

const gotoLogin = () => {
	Actions.login();
 }
 var options = {
	title: 'Pick an Image',
	storageOptions: {
	  //skipBackup: true,
	  //returnBase64Image: true,
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
				imageData: null,
				imageUri:null,
				imageFilename:null,
				imagePath: null,
				imageType: null,
				imageOrigUrl: null,
		};
		this.pickImageHandler = this.pickImageHandler.bind(this);
		this.onChangeTweet = this.onChangeTweet.bind(this);
		this.getTweets = this.getTweets.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
				let data = response.data;
				let uri = response.uri;
				let path = response.path;
				let filename = response.fileName;
				let type = response.type;
				let origUrl = response.origURL;
				
				this.setState({
					imageData: data,
					imageFilename: filename,
					imageUri: uri,
					imagePath: path,
					imageType: type,
					imageOrigUrl: origUrl,
				  });
				  console.log("imageData:"+this.state.imageData);
				  console.log("imageFilename:"+this.state.imageFilename);
				  console.log("imageUri:"+this.state.imageUri);
				  console.log("imagePath:"+this.state.imagePath);
				  console.log("imageType:"+this.state.imageType);
				  console.log("imageOrigUrl:"+this.state.imageOrigUrl);
			}
		});
	}
	
	async getTweets(){
		let token = await AsyncStorage.getItem('access_token');
		tokenJSON = JSON.parse(token);
		console.log("token getTweets = "+tokenJSON.access_token);
		fetch('https://test-mobile.neo-fusion.com/data', {
				method: 'GET',
				headers: {
					//'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
					//'Access-Token': ACCESS_TOKEN
					//'Access-Token': localStorage.getItem('access'),
					//'Access-Token': this.getToken
					//'Access-Token': AsyncStorage.getItem('token')
					'Access-Token': tokenJSON.access_token,
				}
	}).then(results => results.json()).then(data => {let tweets = data.map((item)=>{
				return(
					<View key={item.id}>
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
	  //ACCESS_TOKEN = token;
	  //alert("get token main" + ACCESS_TOKEN);
	  console.log(token);
	  return token;
	}catch(error){
	  alert(error);
	}
  }

async handleSubmit(){
	let token = await AsyncStorage.getItem('access_token');
	tokenJSON = JSON.parse(token);
	console.log('token: ' + JSON.stringify(tokenJSON));
	const image = {
		type: this.state.imageType,
		name: this.state.imageFilename,
		uri: this.state.imagePath,
		data: this.state.imageData,
	};
	let form = new FormData();
	form.append("image", image);
	fetch('http://test-mobile.neo-fusion.com/data/create', {
			method: 'POST',
			headers: {
				//'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
				//'Access-Token': this.getToken
    			'Content-Type': 'multipart/form-data',
				'Access-Token': tokenJSON.access_token,
			},
			body: form,
}).then((response) => {
	console.log(response);
	console.log(JSON.stringify(response));
	return response.json();
})
.then((data)=> {
		console.log(data);
			return fetch('https://test-mobile.neo-fusion.com/data/'+data.id+'/update', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						//'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
						//'Access-Token': AsyncStorage.getItem('token')
						//'Access-Token': this.getToken
						'Access-Token': tokenJSON.access_token,
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
}

	render() {
		return (
			<Container style={{padding: 20}}>		
				<View>
					<Image source={{uri: this.state.imageUri}} style={styles.previewImage}  />
				</View>
				<Content>
					<Form>
						<Button title = "Pick Image" onPress = {this.pickImageHandler}>
							<Text> + </Text>
						</Button>

						<TextInput 
							style = {styles.twit}
							multiline={true} placeholder="What's Happening ?"
							autoGrow={true} maxLength={150} 
							onChange={()=>this.onChangeTweet}
						/>

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