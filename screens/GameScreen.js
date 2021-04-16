import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'
import { Ionicons } from "@expo/vector-icons"
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText >#{listLength - itemData.index}</BodyText>
      <BodyText >{itemData.item}</BodyText>
    </View>
  )
}

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'higher' && currentGuess > userChoice)) {
      Alert.alert("Don't lie!", "You know this is wrong..", [{ text: "Sorry!", style: "cancel" }])
      return
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    // setRounds(curRounds => curRounds + 1)
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
  }
  // Exemple d'utilisation de l'objet Dimensions
  if (Dimensions.get("window").height > 600) {
    return <View>...</View>
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')} ><Ionicons name="md-remove" size={24} color="white" /></MainButton>
        <MainButton onPress={() => nextGuessHandler('higher')} ><Ionicons name="md-add" size={24} color="white" /></MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* ScrollView Version  */}
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((item, index) => renderListItem(item, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          keyExtractor={item => item}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimentions.get("window").height > 600 ? 20 : 10,
    width: 500,
    maxWidth: "90%"
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 350 ? "60%" : "80%"
  },
  list: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 50
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
})

export default GameScreen