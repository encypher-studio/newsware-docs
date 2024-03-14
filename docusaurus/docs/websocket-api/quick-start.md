---
sidebar_position: 1
---

# Quick start

This subscription retrieves news from Dow Jones and SEC if any of the following is true:

* Mentions "bitcoin".
* Mentions "dogecoin" AND NOT "elon musk".
* Has "BTC" OR "XRP" as tickers.
* Is a SEC filing with 1805719 OR 1557593 CIKs.

```typescript
import {text, WsApi, Or, And, Source, WebsocketResponse, Sources, Text, Tickers, Ciks, Field} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY], // Add extra fields to retrieve here
            filter: And(
                Sources.any([Source.DowJones, Source.SEC]),
                Or(
                    Text.any(["bitcoin"]),
                    And(
                        Text.any(["dogecoin"]),
                        Text.exclude(["elon musk"])
                    ),
                    Tickers.any["BTC", "XRP"],
                    Ciks.any([1805719, 1557593])
                )
            )
        })
    },
    // Receive messages from the server
    callback: (message: WebsocketResponse) => {
        if (message.method === WebsocketMethod.SUBSCRIBE
            && message.type === WebsocketResponseType.DATA) {
            // Do anything with the filtered news
        }
    }

    // (Optional) Throw errors and log to console
    errorCallback: (message: WebsocketErrorResponse) => {
        console.log("Websocket error: " + message.value.message)
        throw Error(message.value.message)
    },
    // (Optional) Log when connection closes
    closeCallback: (_: CloseEvent) => {
        console.log("Connection closed")
    },
    // (Optional, default is true) If true, attempts to reconnect if connection is unexpectedly closed.
    reconnect: true,
    // (Optional, default is 1000) Milliseconds to wait before attempting a reconnect.
    reconnectDelay: 1000
})
wsApi.connect()
```