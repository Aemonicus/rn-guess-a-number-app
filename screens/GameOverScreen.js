import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <BodyText>The Game Is Over!</BodyText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            // Version image en local
            source={require('../assets/success.png')}

            // Version image depuis le web
            // source={{ uri: 'https://www.updatepedia.com/wp-content/uploads/2019/04/Successss.jpg' }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>Your phone needed
          <Text style={styles.highlight}> {roundsNumber} </Text> rounds to guess the correct number that was

          <Text style={styles.highlight}> {userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={() => onRestart()}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20
  },
  highlight: {
    color: Colors.primary
  },
  // Version avec component View autour de l'image
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: Dimensions.get("window").width * 0.7 / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30
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