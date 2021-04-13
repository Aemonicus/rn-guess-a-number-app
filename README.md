Commande pour lancer un projet avec expo (expo est un équivalent à create react app) : "expo init nom-du-projet"



--------------------------------
Avec React Native on ne peut pas utiliser la même syntaxe que en HTML et CSS. Même le JSX est différent. On va utiliser un nombre limité de composant qui permettent cependant de couvrir tous les cas de figure.
Par exemple les `<div></div>` n'existent pas, React Native qui doit compiler le code en code natif mobile (java ou kotlin pour android et swift ou ObjectifC pour iOS) ne connait que sa syntaxe propre qu'il traduira ensuite en composant natif.

Donc pas de HTML, pas de CSS, pas de JSX comme sur React mais du JSX plus limité.



---------------------------------
`<View></View>` est un composant équivalent au `<div></div>` utilisé pour encadrer tous les composants/éléments enfants de l'application. React Native ne comprend pas nativement les `<div></div>`

IMPORTANT : Pour définir une width à un élément comme un bouton, il faut passer par une `<View></View>` encapsulant l'élément.

Exemple avec un 
```javascript
<Button />
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
`<FlatList></FlatList>` est un composant qui remplace `<ScrollView></ScrollView>` car plus optimisé. Il n'affiche que les éléments de liste nécessaire et pas ceux cachés/invisibles..
Attention, le composant utilise son "propre" map() avec le props renderItem
Exemple de 
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
Style

- De base les éléments sont en display:flex, flexDirection: "column"

- On ne peut pas utiliser de valeur comme px, soit pourcentage soit juste la valeur seule qui correspondra à la densité du pixel sur l'écran

- Si l'élément parent ne possède pas de valeur fixe avec width and height ou flex (ex : flex:1), le parent n'aura pas de dimension et les éléments enfants ne seront pas visibles

- Penser à utiliser flex:1 si on veut qu'un élément prenne de base toute la place disponible

- On peut placer verticalement un élément simplement avec marginVertical

- Les margins négatifs ne sont pas pris en compte sur Android
"# rn-guess-a-number-app" 
