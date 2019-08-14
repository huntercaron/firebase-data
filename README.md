# FirebaseData

A swappable replacement for the Framer data object that syncs in realtime to Firebase.

### Normal Data Object
```js
const data = Data({
    userLoggedIn: false,
    accentColor: "#0000ff"
})
```
### Realtime Synced Data Object
```js
const data = FirebaseData(firebaseConfig, {
    userLoggedIn: false,
    accentColor: "#0000ff"
})
```

### Things to watch out for
- Empty arrays cannot be stored on the FiredataData object. This is a limitation of firebase. To get around this it's best to check if that value is null and initlize the array when first adding to it.