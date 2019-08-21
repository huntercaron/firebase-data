import * as React from "react"
import { Frame, useCycle, Stack, Scroll } from "framer"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function Convo({ messages = [], userID }) {
    return (
        <Scroll width={"100%"} height={"100%"}>
            <Stack size={"100%"} background={null} direction={"vertical"}>
                {messages.map((m, i) => (
                    <Frame
                        key={i}
                        width={100}
                        height={56}
                        left={userID === m.userID ? null : 0}
                        right={userID === m.userID ? 0 : null}
                    >
                        {i}
                    </Frame>
                ))}
            </Stack>
        </Scroll>
    )
}
