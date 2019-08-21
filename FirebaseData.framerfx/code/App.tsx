import * as React from "react"
import { Frame, useCycle, Override } from "framer"
import { FirebaseData } from "./FirebaseData"

var firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "framer-firebase.firebaseapp.com",
    databaseURL: "https://framer-firebase.firebaseio.com",
    projectId: "framer-firebase",
    storageBucket: "",
    messagingSenderId: "xxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
}

const data = FirebaseData(firebaseConfig, {
    userLoggedIn: false,
    accentColor: "#0000ff",
    messages: [{ userID: 1 }],
    test4: "hehe",
})

export const Convo: Override = () => ({
    messages: data.messages,
})

export const NewMessage: Override = () => ({
    onTap() {
        data.messages = [...data.messages, { userID: 1 }]
    },
})
