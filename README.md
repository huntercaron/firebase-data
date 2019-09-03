# FirebaseData

> A swappable replacement for the Framer data object that syncs it realtime to Firebase.



## Usage

#### Normal Data Object

```js
const data = Data({
    userLoggedIn: false,
    accentColor: "#0000ff",
})
```

#### Firebase Synced Data Object

```js
const data = FirebaseData(firebaseConfig, {
    userLoggedIn: false,
    accentColor: "#0000ff",
})
```



## Install

```
$ yarn add firebase-data
```

[Guide on using NPM packages in Framer x](https://www.framer.com/support/using-framer-x/npm-packages/)



## API

### FirebaseData(firebaseConfig, initialState, ref?)

-   `firebaseConfig` a config object from Firebase project settings.
-   `initialState` an object of default values for the Data object
-   `ref` an optional string to use as a Firebase reference to set/get data
