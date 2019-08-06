import { Data } from "framer"
//@ts-ignore
import * as firebase from "firebase/app"
import "firebase/database"

export function FirebaseData(dataObj, config) {
    let database
    const data = Data(dataObj)
    

    const initFirebase = () => {
        if (!firebase.apps.length) {
            console.log("hi")
            try {
                firebase.initializeApp(config)
            } catch (e) {
                console.log(e)
            }   
        }
        database = firebase.database()
    }

    initFirebase()

    for (let property in data) {
        database.ref(property).on("value", snapshot => {
            data[property] = snapshot.val()
        })
    }

    var p = new Proxy(data, {
        get: (target, name) => {
            return target[name]
        },
        set: (obj, prop, value) => {
            database.ref(prop).set(value)
            return true
        },
    })
    return p
}
