Commande pour lancer un projet avec expo (expo est un équivalent à create react app) : "expo init nom-du-projet"



--------------------------------
Avec React Native on ne peut pas utiliser la même syntaxe que en HTML et CSS. Même le JSX est différent. On va utiliser un nombre limité de composant qui permettent cependant de couvrir tous les cas de figure.
Par exemple les `<div></div>` n'existent pas, React Native qui doit compiler le code en code natif mobile (java ou kotlin pour android et swift ou ObjectifC pour iOS) ne connait que sa syntaxe propre qu'il traduira ensuite en composant natif.

Donc pas de HTML, pas de CSS, pas de JSX comme sur React mais du JSX plus limité.



---------------------------------
`<View></View>` est un composant équivalent au `<div></div>` utilisé pour encadrer tous les composants/éléments enfants de l'application. React Native ne comprend pas nativement les `<div></div>`

IMPORTANT : Pour définir une width à un élément comme un bouton, il faut passer par une `<View></View>` encapsulant l'élément.

Exemple avec un `<Button title="test"/>`
```javascript
  <View style={styles.button}>
    <Button title="CANCEL" color="red" onPress={onCancel} />
  </View>

const styles = StyleSheet.create({
  button: {
    width: "30%"
  }
})
```

--------------------------------
`<ScrollView></ScrollView>` est un composant utilisé à la place du composant `<View></View>` pour permettre le défilement de l'écran car par défaut ce comportement n'est pas supporté sur mobile. Utilisé pour afficher des listes.



--------------------------------
`<TouchableWithoutFeedback></TouchableWithoutFeedback>` est un composant utilisé pour rendre toute une zone intéractive (écouter tous les évènements de type toucher/tap) sans effet visible. 
Exemple avec un évènement fourni de base dans l'API de react-native (il faut quand même l'importer au tout début) qui permet au toucher n'importe où en dehors du clavier de fermer le clavier : 
```javascript
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'

<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
  <View style={styles.screen}>
  ....
  </View>
</TouchableWithoutFeedback>
```


--------------------------------
`<FlatList></FlatList>` est un composant qui remplace `<ScrollView></ScrollView>` car plus optimisé. Il n'affiche que les éléments de liste nécessaire et pas ceux cachés/invisibles..
Attention, le composant utilise son "propre" map() avec le props renderItem
Exemple  
```javascript
<FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            title={itemData.item.value}
            onDelete={() => removeGoalHandler(itemData.item.id)} />
        )}
      />
```



--------------------------------
`<Text></Text>` est un composant utilisé pour afficher du texte. Composant de base obligatoire pour du texte.
- Le style passé d'un `<Text></Text>` parent est transféré à tous les `<Text></Text>` enfants (si l'un dans l'autre). 
C'est le seul composant qui transmet sont style à ses composants enfants, si ces enfants sont des `<Text></Text>`. 
- De plus, `flexbox` n'est pas pris en compte nativement avec les `<Text></Text>`



--------------------------------
`<TextInput/>` est un composant utilisé pour afficher une zone de texte intéractive équivalent à un `<input>`. Composant de base obligatoire pour du permettre de la saisie de texte.



--------------------------------
`<Button title=""/>` est un composant utilisé pour afficher un bouton. La props title est obligatoire. D'autres props comme onPress peuvent être utilisés pour les évènements.
Exemple
```javascript
<View>
  <Button title="Reset" onPress={() => { }} />
  <Button title="Confirm" onPress={() => { }} />
</View>
```



--------------------------------
`<Image source={require('')}/>` est un composant utilisé pour afficher une image. 
Si on va chercher une image en local, on utilise la méthode `require()`
Si on va chercher l'image sur le web, on utilise `{uri: ""}` ATTENTION, pour les images récupérées sur le web il faudra toujours mettre une `width` et une `height`
Exemple
```javascript

<Image
  style={styles.image}
  source={require('../assets/success.png')}
  source={{ uri: 'https://www.updatepedia.com/wp-content/uploads/2019/04/Successss.jpg' }}
  resizeMode="cover"
/>

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    marginVertical: 30
  }
})

```

--------------------------------
`<AppLoading />` est un composant utilisé pour différer le chargement de la page en attendant qu'un certain élément ait terminé. 
Penser à poser dans le terminal : expo install expo-app-loading

Exemple
```javascript

import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
...

  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)}
    />
  }

  ...
}
```

--------------------------------
# Style

- De base les éléments sont en display:flex, flexDirection: "column" SAUF `<Text></Text>`

- On ne peut pas utiliser de valeur comme px, soit pourcentage soit juste la valeur seule qui correspondra à la densité du pixel sur l'écran

- Si l'élément parent ne possède pas de valeur fixe avec width and height ou flex (ex : flex:1), le parent n'aura pas de dimension et les éléments enfants ne seront pas visibles

- Penser à utiliser flex:1 si on veut qu'un élément prenne de base toute la place disponible

- On peut placer verticalement un élément simplement avec `marginVertical`

- On peut placer horizontalement un élément simplement avec `paddingHorizontal`

- On ne peut pas poser une `fontFamily` à un élément parent pour qu'elle soit passée à tous les enfants, il faut soit poser la `fontFamily` à tous les éléments que l'on souhaite, soit créer un component qui aura comme style la `fontFamily` qui nous intéresse. Ensuite on remplace tous les components `<Text></Text>` par le component que l'on vient de créer.
Exemple :

 ```javascript
import React from 'react'
import { Text, StyleSheet } from 'react-native'

const BodyText = ({ children }) => <Text style={styles.body}>{children}</Text>

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans'
  }
})

export default BodyText

```

- Les margins négatifs ne sont pas pris en compte sur Android

- Si je veux poser une box-shadow pour, par exemple, créer une card, je dois utiliser :
  - Pour iOS `shadow..`
  ```javascript
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    padding: 20,
    borderRadius: 10
   ```
  - Pour Android `elevation`
  ```javascript
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    padding: 20,
    borderRadius: 10
  ```
  Du coup c'est beaucoup plus limité en terme de personnalisation sur Android qui applique de base le style Materialize UI. On posera `shadow..` et `elevation` dans le même style car React Native compile pour les deux systèmes en même temps mais une seule propriété fonctionnera suivant le système du client

- Pour utiliser du style différent pour deux éléments dans un même texte, on peut mettre un `<Text></Text>` dans un `<Text></Text>`. Le style passé d'un `<Text></Text>` est transféré à tous les `<Text></Text>` enfants. De plus, `flexbox` n'est pas pris en compte nativement avec les `<Text></Text>`


--------------------------------
# Créer un bouton personnalisé
On peut remplacer les composants `<Button>` par des composants customs, notamment pour le style. L'import de TouchableOpacity est important (ou un autre Touchable) pour rendre le bouton "clickable"

Exemple
```javascript
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Colors from '../constants/colors'

const MainButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
```