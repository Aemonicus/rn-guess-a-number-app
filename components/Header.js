import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/colors'


const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 40,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "black",
    fontSize: 20,
    fontFamily: 'open-sans-bold'
  }
})

export default Header
