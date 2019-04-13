import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

const DEFAULT_AVATAR = 'https://silviaolmedo.com/wp-content/uploads/2015/11/facebook.jpg'
const AVATAR_SIZE = 32

const Comment = (props) =>
  <View style={styles.comment}>
    {
      props.avatar ?
        <Image style={styles.avatar} source={{ uri: props.avatar }} /> :
        <Image style={styles.avatar} source={{ uri: DEFAULT_AVATAR }} />
    }

    <Text style={styles.text}>{props.text}</Text>
  </View>
const styles = StyleSheet.create({
  comment: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar:{
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  }
})

export default Comment
