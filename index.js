import { Data } from "framer"
//@ts-ignore
import * as firebase from "firebase/app"
import "firebase/database"

/**
 * Initialiizes the Firebase app used by the data object
 * @param config Firebase config object
 */
function FirebaseApp(config) {
    // The Firebase app object
    // https://firebase.google.com/docs/reference/js/firebase.app.App
    const app = !firebase.apps.length
        ? firebase.initializeApp(config)
        : firebase.app()

    // The actual database object
    // https://firebase.google.com/docs/reference/js/firebase.database.Database
    const database = app.database()

    // The root ref of the database (top-level)
    // https://firebase.google.com/docs/reference/js/firebase.database.Reference
    const rootRef = database.ref()

    // Returns the value of a certain ref in the database
    const getRef = ref =>
        new Promise((resolve, reject) => {
            database.ref(ref).once("value", snapshot => {
                resolve(snapshot.val())
            })
        })

    // Returns the value of the root ref
    const getRootRef = () =>
        new Promise((resolve, reject) => {
            rootRef.once("value", snapshot => {
                resolve(snapshot.val())
            })
        })

    return { app, database, getRootRef, getRef }
}

/**
 * Wraps the Framer.Data object with realtime Firebase support
 * @param config Firebase config object
 * @param initialState The initial state of the data
 * @param ref The Firebase reference to use to set/get data
 * @returns Framer.Data object with Firebase support
 */
export function FirebaseData(config = {}, initialState, ref = "") {
    const { database, app } = FirebaseApp(config)
    const data = Data(initialState)
    const firebaseEmptyArrayString = "$$firebaseEmptyArray"
    let initialized = false

    // Setter & Getter for values in firebase
    const setFirebaseSafeValue = value =>
        Array.isArray(value) && value.length === 0
            ? firebaseEmptyArrayString
            : value

    const getFirebaseSafeValue = value =>
        value === firebaseEmptyArrayString ? [] : value

    // Promises that resolve when data is in sync with Firebase
    const intializingProps = Object.keys(initialState).map(prop => {
        return new Promise((resolve, reject) => {
            const refPath = ref ? `${ref}/${prop}` : prop

            database.ref(refPath).once("value", snapshot => {
                if (snapshot.exists()) {
                    data[prop] = getFirebaseSafeValue(snapshot.val())
                    resolve()
                } else {
                    database
                        .ref(refPath)
                        .set(setFirebaseSafeValue(initialState[prop]))
                        .then(resolve)
                }
            })

            database.ref(refPath).on("value", snapshot => {
                data[prop] = getFirebaseSafeValue(snapshot.val())
            })
        })
    })

    Promise.all(intializingProps).then(() => {
        // Prevents setting of firebase variables before data is in sync
        initialized = true
    })

    // Remove Firebase connection on page unload
    window.addEventListener("unload", () => {
        app.delete()
    })

    var p = new Proxy(data, {
        get: (target, name) => {
            return target[name]
        },
        set: (obj, prop, value) => {
            const refPath = ref ? `${ref}/${String(prop)}` : prop
            if (initialized) {
                // @ts-ignore
                database.ref(refPath).set(setFirebaseSafeValue(value))
            }

            return true
        },
    })

    return p
}
