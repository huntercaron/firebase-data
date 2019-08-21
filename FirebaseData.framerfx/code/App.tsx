import * as React from "react"
import { Frame, useCycle, Override } from "framer"
import { FirebaseData } from "./FirebaseData"

var firebaseConfig = {
    apiKey: "AIzaSyBctPiEporhwRjzZ1TOz89mZOCzN5ramAQ",
    authDomain: "framer-firebase-116d1.firebaseapp.com",
    databaseURL: "https://framer-firebase-116d1.firebaseio.com",
    projectId: "framer-firebase-116d1",
    storageBucket: "",
    messagingSenderId: "155502761427",
    appId: "1:155502761427:web:7b78c2d51bdf7462",
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
