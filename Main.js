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

import RNFetchBlob from 'react-native-fetch-blob'

import axios from 'axios';

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
				data: null
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
					imagePath: path,
					imageType: type,
					imageOrigUrl: origUrl,
					imageUri: uri,
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
	async storeID(id){
		try{
			await AsyncStorage.setItem('id', id);
		}catch(error){
			console.log("something went wrong store id");
		}
	}
  async handleSubmit(){

	let token = await AsyncStorage.getItem('access_token');
	let id = await AsyncStorage.getItem('id');
	tokenJSON = JSON.parse(token);
	console.log('token: ' + JSON.stringify(tokenJSON));
	/*
	RNFetchBlob.fetch('POST', 'http://test-mobile.neo-fusion.com/data/create', {
	  'Content-Type': 'multipart/form-data',
	  'Access-Token': tokenJSON.access_token,
	  }, [
	  { name : 'photo', 
	  filename : this.state.imageFilename, 
	  type:this.state.imageType, 
	  data: this.state.imageData},
	  ]).then((response) => response.json()).then((data)=>{
		console.log("response create twit = "+JSON.stringify(data));
	  fetch('https://test-mobile.neo-fusion.com/data/'+data.id+'/update', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Access-Token': tokenJSON.access_token,
		},
		body: JSON.stringify({
		  'summary': this.state.tweet,
		  'detail': this.state.tweet,
		})
	  }).then(response => response.json()).then((data =>{
		this.getTweets();
	  }))
	  })
	  .catch((err) => {
	  console.error(err);
	  })
	  */
	var data = new FormData();
	data.append('file', {uri: this.state.imageUri, name: this.state.imageFilename, type: this.state.imageType});
  
	const config = {
	  headers: { //'content-type': 'multipart/form-data',
			'Access-Token': tokenJSON.access_token
	  },
	  timeout: 10000
	}
	const config2 = {
		headers: { //'content-type': 'multipart/form-data',
			'Access-Token': tokenJSON.access_token,
			'Content-Type': 'application/json',
	  },
		timeout: 10000,
		//responseType:'text'
	}
	let message = this.state.tweet;
	var res_msg;
	axios.post('http://test-mobile.neo-fusion.com/data/create', data, config)
	  .then(response => {
			//this.storeID(response.data.id);
			//console.log(JSON.parse(response.data.id));
			/*return axios.post('https://test-mobile.neo-fusion.com/data/'+response.data.id+'/update',{
				'summary': this.state.tweet,
				'detail': this.state.tweet,
			},config2);*/
			return axios({
				url:'https://test-mobile.neo-fusion.com/data/'+response.data.id+'/update',
				data: {
					'summary': message,
					'detail': message,
				},
				method: 'post',
				headers:{
					'Access-Token': tokenJSON.access_token,
					'Content-Type': 'application/json',
				}
			});
			//console.log(response.data.id);
		})
		.then(res => this.getTweets())
	  .catch((error) => {
	  console.log("Error gelondongan = "+error); 
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
							value={this.state.tweet}
							onChangeText={(text)=>this.setState({tweet: text})}
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