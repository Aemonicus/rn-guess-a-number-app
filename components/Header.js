import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

import Colors from '../constants/colors'


const Header = ({ title }) => {
  return (
    // <View style={styles.header}>
    <View style={{ ...styles.headerBase, ...Platform.select({ ios: styles.headerIOS, android: styles.headerAndroid }) }}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  // header: {
  //   width: "100%",
  //   height: 90,
  //   paddingTop: 40,
  //   backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderBottomColor: Platform.OS === "ios" ? "#ccc" : "transparent",
  //   borderBottomWidth: Platform.OS === "ios" ? 1 : 0
  // },
  // headerTitle: {
  //   color: Platform.OS === "ios" ? Colors.primary : "white",
  //   fontSize: 20,
  //   fontFamily: 'open-sans-bold',
  // }

  // Version plus "propre"
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: Platform.OS === "ios" ? Colors.primary : "white",
    fontSize: 20,
    fontFamily: 'open-sans-bold',
  }
})

export default Header
