import * as React from "react"
import { Frame, useCycle, Override } from "framer"
import { FirebaseData } from "./FirebaseData"

const firebaseConfig = {
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
