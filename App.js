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
  Image
} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
//import ArtistBox from './src/ArtistBox';
//import ArtistList from './src/ArtistList';
//import { getArtists } from './src/api-client';
import {Scene, Router} from 'react-native-router-flux';
import HomeView from './src/HomeView';
import LoginView from './src/LoginView';
import ArtistDetailView from './src/ArtistDetailView';
type Props = {};

export default class App extends Component<Props> {
  render(){
    return (
    <Router>
    <Scene key="root">
      <Scene key="login" component={LoginView} hideNavBar />
      <Scene key="home" component={HomeView} hideNavBar/>
      <Scene key="artistsDetail" component={ArtistDetailView} title="Comentarios" hideNavBar={false} />
    </Scene>
  </Router>
  )
}

}
