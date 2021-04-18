import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

import Colors from '../constants/colors'

const MainButton = ({ children, onPress }) => {

  let ButtonComponent = TouchableOpacity

  if (Platform.OS === 'android' && Platform.Versionn >= 21) {
    ButtonComponent = TouchableNativeFeedback
  }
  return (
    // on doit encapsuler le bouton dans une View si on veut garder sous controle l'effet du bouton, hack de styles sur RN
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 20
  }
})

export default MainButton