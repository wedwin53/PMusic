/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

import ArtistBox from './ArtistBox'
import { Actions } from 'react-native-router-flux'
type Props = {};

export default class ArtistList extends Component<Props> {

  constructor(props) {
     super(props);
     const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => {
       r1 !== r2
     }})
     this.state = {
       dataSource: ds
     }
   }

   componentDidMount() {
     this.updateDataSource(this.props.artists)
   }

   componentWillReceiveProps(newProps) {
     if (newProps.artists !== this.props.artists) {
       this.updateDataSource(newProps.artists)
     }
   }

   updateDataSource = (data) => {
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(data)
     })
   }
   handlePress(artist){
     Actions.artistsDetail({ artist })
   }

   render() {
     return (
       <ListView
         enableEmptySections={true}
         dataSource={this.state.dataSource}
         renderRow={(artist) => {
           return (
           <TouchableOpacity
             onPress={() => this.handlePress(artist)}>
             <ArtistBox artist={artist} />
           </TouchableOpacity>
         )
         }}
       />
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'lightgray',
     paddingTop: 70,
   },
 });
