import { Data } from "framer"
//@ts-ignore
import * as firebase from "firebase/app"
import "firebase/database"

/**
 * Initialiizes the Firebase app used by the data object
 * @param config Firebase config object
 */
function FirebaseApp(config) {
    const initializeApp = config => {
        firebase.initializeApp(config)
        return firebase.app()
    }

    // The Firebase app object
    // https://firebase.google.com/docs/reference/js/firebase.app.App
    const app = initializeApp(config)

    // The actuaß database object
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
export function FirebaseData(config= {}, initialState, ref) {
    const { database, app } = FirebaseApp(config)
    const data = Data(initialState)

    for (let prop in data) {
        const refPath = ref ? `${ref}/${prop}` : prop

        database.ref(refPath).once("value", snapshot => {
            data[prop] = snapshot.val()

            if (snapshot.val() === null) {
                database.ref().set("")
            }
        })

        database.ref(refPath).on("value", snapshot => {
            data[prop] = snapshot.val()
        })
    }

    var p = new Proxy(data, {
        get: (target, name) => {
            return target[name]
        },
        set: (obj, prop, value) => {
            const refPath = ref ? `${ref}/${prop}` : prop
            // @ts-ignore
            database.ref(refPath).set(value)
            return true
        },
    })

    return p
}