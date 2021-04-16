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