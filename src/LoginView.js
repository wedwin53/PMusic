/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  Image,
  ImageBackground,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ArtistBox from './ArtistBox';
//dependencias del SDK facebook
import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux';
// import * as firebase from "firebase";
import firebase, { firebaseAuth } from './firebase'
// const config = {
//     apiKey: "AIzaSyBKRxNK2wPcILo-L0WtzW8xkwXA48O7FHo",
//     authDomain: "platzimusic-f9063.firebaseapp.com",
//     databaseURL: "https://platzimusic-f9063.firebaseio.com",
//     projectId: "platzimusic-f9063",
//     storageBucket: "platzimusic-f9063.appspot.com",
//     messagingSenderId: "1020056133499"
//   };
//   firebase.initializeApp(config);

  const { FacebookAuthProvider } = firebase.auth
  // const firebaseAuth = firebase.auth()

type Props = {};

export default class LoginView extends Component<Props> {
  state = {
     credential: null
   }

   componentWillMount() {
     this.authenticateUser();
   }

   authenticateUser = () => {
     AccessToken.getCurrentAccessToken().then((data) => {
       const { accessToken } = data
       const credential = FacebookAuthProvider.credential(accessToken)
       firebaseAuth.signInWithCredential(credential).then((credentials) => {
         this.setState({ credentials })
       }, (error) => {
         console.log("Sign in error", error)
       })
     })
   }

   render() {
     return (
       <ImageBackground source={require('./background.jpg')} style={styles.container}>
         <Image source={require('./logo.png')} style={styles.logo} />
         <Text style={styles.welcome}>Bienvenidos a PlatziMusic</Text>
         <Text style={styles.welcome}>
           {this.state.credentials && this.state.credentials.displayName}
         </Text>
         <Button style={styles.buttonSeguir} onPress={this.handleButtonPress} title='Seguir' />
         <LoginButton
           readPermissions={['public_profile', 'email']}
           onLoginFinished={ this.handleLoginFinished }
           onLogoutFinished={() => alert("logout.")}/>
       </ImageBackground>
     );
   }

   handleLoginFinished = (error, result) => {
     if (error) {
       console.error(error)
     } else if (result.isCancelled) {
       console.warn("login is cancelled.");
     } else {
       this.authenticateUser()
     }
   }

   handleButtonPress = () => {
     Actions.home()
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     width: null,
     height: null,
     backgroundColor: 'lightgray',
     justifyContent: 'center',
     alignItems: 'center'
   },
   welcome: {
     fontSize: 24,
     fontWeight: '600',
     marginBottom: 20,
     backgroundColor: 'transparent',
     color: 'white',
   },
   logo: {
     width: 120,
     height: 120,
     marginBottom: 15,
   },
   buttonSeguir: {
     marginBottom: 20,
   }
 });
