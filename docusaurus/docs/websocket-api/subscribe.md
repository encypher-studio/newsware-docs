---
sidebar_position: 3
---

# Subscribe

The subscribe function is used to subscribe to news updates using the Websocket API.

# Definition

It accepts the following arguments:

```typescript
function subscribe(
    options: {
        subscriptionId: string
        filter: Filter
    },
    resubscribeOnReconnect: boolean = true
) {
...
}
```

| Name           | Definition                                                                                                        | Required |
|----------------|-------------------------------------------------------------------------------------------------------------------|----------|
| subscriptionId | An id used to identify the subscription, the server will send messages related to this subscription using this id | ✅        |
| fields         | A list of fields to retrieve from the news. Id is always returned. Refer to [Fields](./fieds)                     |          |
| filter         | An object used to filter news, refer to [Filter](./filter)                                                        | ✅        |

# Fields
The available fields are:

```typescript
export enum Field {
    ID = "id",
    HEADLINE = "headline",
    BODY = "body",
    TICKERS = "tickers",
    SOURCE = "source",
    PUBLICATION_TIME = "publicationTime",
    RECEIVED_TIME = "receivedTime",
    CREATION_TIME = "creationTime",
    CATEGORY_CODES = "categoryCodes",
    CIKS = "ciks",
    LINK = "link"
}
```

# Usage

This subscription returns all unfiltered news and implements all callbacks:

````typescript
import {WebsocketResponse, WsApi, Field} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY], // Add extra fields to retrieve here
            filter: {
                // Add filters here
            }
        })
    },
    // Receive messages from the server
    callback: (message: WebsocketResponse) => {
        if (message.method === WebsocketMethod.SUBSCRIBE
            && message.type === WebsocketResponseType.DATA) {
            // Do anything with the filtered news
            console.log(message.value)
        }
    },
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
    automaticReconnect: true,
})
````