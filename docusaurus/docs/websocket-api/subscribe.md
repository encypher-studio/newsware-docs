---
sidebar_position: 2
---

# Subscribe

The subscribe function is used to subscribe to news updates using the Websocket API.

# Definition

It accepts the following arguments:

```typescript
function subscribe(
    filter: Filter,
    callback: (news: News) => void,
    errorCallback?: (errorEvent: ErrorEvent) => void,
    openCallback?: () => void,
    closeCallback?: (closeEvent: CloseEvent) => void
) {
...
}
```

| Name          | Definition                                                           | Required |
|---------------|----------------------------------------------------------------------|----------|
| filter        | An object used to filter news, refer to [Filter](./filter)           | ✅        |
| callback      | The filtered news will be passed to this callback                    | ✅        |
| errorCallback | A callback to receive websocket errors                               |          |
| openCallback  | A callback to be called when the websocket connection is established |          |
| closeCallback | A callback to be called if the websocket connection is closed        |          |

# Usage

This subscription returns all unfiltered news and implements all callbacks:

````typescript
import {Api, News} from "newsware"
import {ErrorEvent, CloseEvent} from "ws";

const api = new Api(apiKey)
api.subscribe(
    {
        // Add filters here
    },
    // On news received
    (news: News) => {
        console.log(news)
    },
    // On error
    (error: ErrorEvent) => {
        console.log("Websocket error: " + error.message)
    },
    // On connection opened
    () => {
        console.log("Connection established, waiting for news...")
    },
    // On connection closed
    (_: CloseEvent) => {
        console.log("Connection closed")
    }
)
````