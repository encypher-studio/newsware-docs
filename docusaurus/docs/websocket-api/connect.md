---
sidebar_position: 2
---

# Connect

To establish a connection to the websocket API, use the WsClient class.

# Definition

The constructor is defined as follows:

```typescript
export class WsApi {
...

    constructor(
        private apikey: string,
        options: {
            callback: (response: WebsocketResponse) => void,
            errorCallback?: (error: WebsocketErrorResponse) => void,
            openCallback?: () => void,
            closeCallback?: (closeEvent: CloseEvent) => void
        }
    ) { ...
    }

...
}
```

## Connect Options

| Name               | Definition                                                                                    | Required |
|--------------------|-----------------------------------------------------------------------------------------------|----------|
| callback           | The filtered news will be passed to this callback                                             | ✅        |
| errorCallback      | A callback to receive websocket errors                                                        |          |
| openCallback       | A callback to be called when the websocket connection is established                          |          |
| closeCallback      | A callback to be called if the websocket connection is closed                                 |          |
| automaticReconnect | (Defaults to true) If true, it attempts to reconnect if the connection is closed unexpectedly |          |

## WebsocketResponse

| Name    | Definition                                                                                                                           |
|---------|--------------------------------------------------------------------------------------------------------------------------------------|
| method  | Method the message belongs to, for subscripton it will be "subscription"                                                             |
| type    | Type of message, can be "ok" to acknowledge a request, "error" to report an error, or "data" to deliver data in case of subscription |
| id      | Id associated to the request. For subscriptions, it is the id used when subscribing.                                                 |
| payload | The payload type depends on the method, for subscriptions it will be News[]                                                          |

## WebsocketErrorResponse

It's a [WebsocketResponse](#WebsocketResponse) with a payload of type:

| Name    | Definition    |
|---------|---------------|
| message | Error message |

# Usage

Refer to [Quick Start](./quick-start.md).