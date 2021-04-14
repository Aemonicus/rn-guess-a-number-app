import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'

import BodyText from '../components/BodyText'

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <BodyText>The Game Is Over!</BodyText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          // Version image en local
          // source={require('../assets/success.png')}

          // Version image depuis le web
          source={{ uri: 'https://www.updatepedia.com/wp-content/uploads/2019/04/Successss.jpg' }}
          resizeMode="cover"
        />
      </View>
      <BodyText>Number of Rounds: {roundsNumber}</BodyText>
      <BodyText>Number was: {userNumber}</BodyText>
      <Button title="NEW GAME" onPress={() => onRestart()} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // Version avec component View autour de l'image
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30
  },
  image: {
    width: "100%",
    height: "100%"
  }
  // Version sans le component View autour de l'image
  // image: {
  //   width: 300,
  //   height: 300,
  //   borderRadius: 200,
  //   borderWidth: 3,
  //   borderColor: 'black',
  //   marginVertical: 30
  // }
})

export default GameOverScreen