import * as React from "react"
import { Frame, useCycle, Override } from "framer"
import { FirebaseData } from "./FirebaseData"

const firebaseConfig = {
    apiKey: "AIzaSyBctPiEporhwRjzZ1TOz89mZOCzN5ramAQ",
    authDomain: "framer-firebase-116d1.firebaseapp.com",
    databaseURL: "https://framer-firebase-116d1.firebaseio.com",
    projectId: "framer-firebase-116d1",
    storageBucket: "",
    messagingSenderId: "155502761427",
    appId: "1:155502761427:web:fc8436deb30c32ca",
}

const data = FirebaseData(firebaseConfig, {
    userLoggedIn: false,
    accentColor: "#0000ff",
    messages: [{ userID: 1 }],
})

export const Convo: Override = () => ({
    messages: data.messages,
})

export function Hover(): Override {
    return {
        whileHover: { scale: 0.8 },
        onTap() {
            data.test = "fuck"
        },
    }
}
