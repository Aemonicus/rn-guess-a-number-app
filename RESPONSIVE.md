# Règles globales

- Mettre `width` en % avec une `minWidth` en fixe et une `maxWidth` en %
  Exemple
```javascript
import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
   inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
})

```



--------------------------------
# Dimensions API
Il s'agit d'un objet mis à disposition par React Native pour avoir accès à certaines informations de l'appareil.
Par exemple pour avoir accès à la largeure totale de l'appareil, je peux choisir entre 'window' ou 'screen', toujours choisir 'window'. iOS ne bronche pour aucun des deux mais Android ne prendra pas toute la largeure avec 'screen' donc 'window'..

Exemple 
```javascript
import React from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
   button: {
    // width: 100
    // width: "20%"
    width: Dimensions.get('window').width / 4
  },
})

```

Ci-dessus, je peux décider de la largeure du bouton grâce à 
  - width en fixe
  - width en pourcentage
  - width utilisant l'objet Dimensions.
  
L'objet `Dimensions` donne accès à certaines méthodes, dans cet exemple il me donne la largeure TOTALE de l'appareil, là où le pourcentage donne une information basée sur la largeure du parent


Je peux aussi utiliser une ternaire pour choisir une valeur en fonction de la taille, ci-dessous la hauteur dans l'exemple

Exemple 
```javascript
import React from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimentions.get("window").height > 600 ? 20 : 10,
    width: 500,
    maxWidth: "90%"
  }
})

```

Je peux aussi utiliser `Dimensions` en dehors de styleSheet, par Exemple

```javascript
import React from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'

...
// En dehors du return
if (Dimensions.get("window").height > 600) {
    return <View>...</View>
  }

// Dans le return pour indiquer le style à prendre pour le composant <Card>
return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={Dimensions.get("window").height > 600 ? styles.buttonContainer : styles.buttonContainerSmall}>
)
...

```