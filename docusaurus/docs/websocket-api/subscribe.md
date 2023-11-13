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

| Name               | Definition                                                                                    | Required |
|--------------------|-----------------------------------------------------------------------------------------------|----------|
| subscriptionId     | An id, the server will send messages related to the subscription using this id                | ✅        |
| filter             | An object used to filter news, refer to [Filter](./filter)                                    | ✅        |
| callback           | The filtered news will be passed to this callback                                             | ✅        |
| errorCallback      | A callback to receive websocket errors                                                        |          |
| openCallback       | A callback to be called when the websocket connection is established                          |          |
| closeCallback      | A callback to be called if the websocket connection is closed                                 |          |
| automaticReconnect | (Defaults to true) If true, it attempts to reconnect if the connection is closed unexpectedly |          |

# Usage

This subscription returns all unfiltered news and implements all callbacks:

````typescript
import {WebsocketResponse, WsApi} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            filter: {
                // Add filters here
            }
        })
    },
    callback: (message: WebsocketResponse) => {
        if (message.method === WebsocketMethod.SUBSCRIBE
            && message.type === WebsocketResponseType.DATA) {
            // Do anything with the filtered news
        }
    }
})
````