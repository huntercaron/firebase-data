import * as React from "react"
import { Frame, useCycle, Stack } from "framer"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function Convo({ messages = [], userID }) {
    console.log(messages)
    return (
        <Stack size={"100%"} background={null}>
            {" "}
            {messages.map(m => (
                <Frame
                    width={100}
                    height={56}
                    left={userID === m.userID ? null : 0}
                    right={userID === m.userID ? 0 : null}
                />
            ))}
        </Stack>
    )
}
