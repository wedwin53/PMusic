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
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseDatabase, firebaseAuth } from './firebase'

type Props = {};

export default class ArtistBox extends Component<Props> {
  state = {
    liked: false,
    likeCount: 0,
    commentCount: 0
  }
  componentWillMount(){
    const { uid } = firebaseAuth.currentUser
    this.getArtistRef().on('value', snapshot =>{
      const artist = snapshot.val()
      if (artist) {
        this.setState({
          likeCount: artist.likeCount,
          liked: artist.likes && artist.likes[uid],
          //contar Comentarios
          commentCount: artist.commentCount
        })
      }
    })
  }

  handlePress = () => {
    //const { id } = this.props.artist
    //this.setState({ liked: !this.state.liked })
    //firebaseDatabase.ref(`artist/${id}`).set()
    this.toggleLike(!this.state.liked)
  }
  getArtistRef = () => {
    const { id } = this.props.artist
    return firebaseDatabase.ref(`artist/${id}`)
  }

  toggleLike = (liked) => {
    const { uid } = firebaseAuth.currentUser
          this.getArtistRef().transaction(function(artist) {
        if (artist) {
          if (artist.likes && artist.likes[uid]) {
            artist.likeCount--;
            artist.likes[uid] = null;
          } else {
            artist.likeCount++;
            if (!artist.likes) {
              artist.likes = {};
            }
            artist.likes[uid] = true;
          }
        }
        return artist || {
          likeCount: 1,
          likes: {
            [uid]: true
          }
        };
      });
  }

  render() {
    //console.warn('el nombre es:', this.props.artist.name);
    const { image, name, likes, comments } = this.props.artist
    const likeIcon = this.state.liked ?
      <Icon name="md-heart" size={30} color="#e74c3c" /> :
      <Icon name="md-heart-outline" size={30} color="gray" />
  //break;
    const { likeCount } = this.state
    const { commentCount } = this.state
    return (

        <View style={styles.artistBox} >
          <Image style={styles.Image} source={{ uri: image}}/>
          <View style={styles.info}>
            <Text style={styles.name}> {name} </Text>
            <View style={styles.row} >
              <View style={styles.iconContainers} >
                  <TouchableOpacity onPress={this.handlePress}>
                    {likeIcon}
                  </TouchableOpacity>
                  <Text style={styles.count} >{likeCount}</Text>
              </View>
              <View style={styles.iconContainers} >
                  <Icon name="md-chatbubbles" size={30} color="gray" />
                  <Text style={styles.count}>{commentCount}</Text>
              </View>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({

  artistBox: {
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 10,
    elevation: 3,
  },
  Image: {
    width: 150,
    height: 150,
  },
  info:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name:{
    fontSize: 20,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 15,
  },
  iconContainers:{
    flex: 1,
    alignItems: 'center',
  },
  count: {
    color: 'gray',
  }

});
