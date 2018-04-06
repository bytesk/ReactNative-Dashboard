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
					pickedImaged: {uri: res.uri}
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

							<Body>
								<Thumbnail source={{uri: item.thumbnail_url}} style={{height: 200, width: 200, flex: 1, marginLeft: 11}}/>
							</Body>
						</CardItem>
					</Card>

					<Card>
						<CardItem>
							<Text style = {{marginTop: 15, marginBottom: 5, marginLeft: 11}}>
									{item.summary}
							</Text>
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
		this.getToken2();
		this.getToken();
	}

	
    async getToken(){
		try{
		  let token =  await AsyncStorage.getItem(ACCESS_TOKEN);
		  console.log("token is main1 : " + token);
		}catch(error){
		  console.log("something went wrong login getToken login");
		}
	  }

	  getToken2 = () =>{
        AsyncStorage.getItem(ACCESS_TOKEN)
        .then((token) =>
            {
                console.log("tokennya2 main = "+token);
            }
        ).catch((error) =>
            {
                console.log("erorr token2 main = "+error);
            });
     }


	async handleSubmit(e){
		let image = document.getElementById("profilePictures").files[0];
		let form = new FormData();
		form.append("file", image);
		console.log( form.get('file'));
		fetch('http://test-mobile.neo-fusion.com/data/create', {
				method: 'POST',
				headers: {
					'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
				},
				body: form
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

	async onSubmit() {
		this.setState({showProgress: true})
		try {
			let response = await fetch('http://test-mobile.neo-fusion.com/data/create', {
										method: 'POST',
										headers: {
											'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
										},
										body: form
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

			let res = await response.text();
			if (response.status >= 200 && response.status < 300) {
					//Handle success
					this.setState({error: ""});
					let accessToken = res;
					this.storeToken(accessToken);
					console.log("res token: " + accessToken);
					Actions.tab()
			} else {
					//Handle error
					let error = res;
					throw error;
			}
		} catch(error) {
				console.log("error " + error);
		}
	}

	async onSubmitNew() {
		try {
			let response = await fetch('https://test-mobile.neo-fusion.com/data/'+data.id+'/update', {
										method: 'POST',
										headers: {
											'Access-Token': 'e9c08727-7730-4077-965c-229168cabd84',
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
												'summary': this.state.tweet,
												'detail': this.state.tweet,
										})
									});
			let res = await response.text();
			if (response.status >= 200 && response.status < 300) {
					//Handle success
					this.setState({error: ""});
					let accessToken = res;
					this.storeToken(accessToken);
					console.log("res token: " + accessToken);
					Actions.tab()
			} else {
					//Handle error
					let error = res;
					throw error;
			}
		} catch(error) {
				//this.removeToken();
				this.setState({error: error});
				console.log("error " + error);
				this.setState({showProgress: false});
		}
	}


	render() {
		// const isAuthenticated = this.getToken();
		// {!isAuthenticated ? 
		// 	Actions.login() :
		// 	Actions.tab()
		//   }
		return (
			<Container style={{padding: 20}}>
									
				<View>
					<Image source= {this.state.pickedImaged} style={styles.previewImage}  />
				</View>
				<Content>
					<Form>
						<Button title = "Pick Image" onPress = {this.pickImageHandler} id="profilePictures" name="file" ref="file">
							<Text> pick </Text>
						</Button>


						<TextInput style = {styles.twit} multiline={true} placeholder="What's Happening ?" 
							autoGrow={true} maxLength={150}
						/>
						<Button style = {styles.btnTwit} full onPress = {this.handleSubmit.bind(this)} >
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
	},
	imgPush: {
		height: "80%",
		width: "80%"
	}
})