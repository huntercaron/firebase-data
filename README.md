# FirebaseData

A swappable replacement for the Framer data object that syncs the data in realtime to Firebase.

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