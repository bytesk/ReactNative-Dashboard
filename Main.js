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

import ImagePicker from 'react-native-image-picker';


const ACCESS_TOKEN = 'access_token';
const gotoLogin = () => {
	Actions.login();
 }


export default class Main extends Component {
	constructor(props){
		super(props);
		this.state = {
				tweets: [],
				file:"null",
				tweet: '',
				people: [],
				pickedImaged: null
		};
	}

	pickImageHandler = () => {
		ImagePicker.showImagePicker({title: "Pick an image"}, res => {
			if(res.didCancel){
				console.log("User cancelled");
			}
			else if(res.error){
				console.log("Error", res.error);
			}
			else{
				this.setState({
					pickedImaged: encodeURIComponent(res.uri)
				});
			}
		});
	}
	
	getTweets(){
		fetch('https://test-mobile.neo-fusion.com/data', {
				method: 'GET',
				headers: {
					'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
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

handleSubmit(e){
	const image = {
		 uri: this.state.pickedImaged,
   		 type: 'image/jpeg',
   		 name: 'photo.jpg',
	};
	console.log(this.state.pickedImaged.uri);
	let form = new FormData();
	form.append("file", image);
	console.log( form.get('file'));
	fetch('http://test-mobile.neo-fusion.com/data/create', {
			method: 'POST',
			headers: {
				'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
			},
			body: form,
}).then((response) => response.json())
.then((data)=> {
		console.log(data);
		
			fetch('https://test-mobile.neo-fusion.com/data/'+data.id+'/update', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
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
		//const isAuthenticated = this.getToken();
		return (
			<Container style={{padding: 20}}>
									
						<View>
							<Image source= {this.state.pickedImaged} style={styles.previewImage}  />
						</View>
				<Content>
					<Form>

						<Button title = "Pick Image" onPress = {this.pickImageHandler}>
							<Text> pick </Text>
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