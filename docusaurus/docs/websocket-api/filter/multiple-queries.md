---
sidebar_position: 3
---

# Multiple queries

Multiple queries can be joined with "and" and "or" conditions.

## Usage

Search all news containing "bitcoin" or "crypto" or "ethereum":

````typescript
import {WebsocketResponse, WsApi, or, text} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            filter: {
                query: or(
                    text("bitcoin"),
                    text("crypto"),
                    text("ethereum")
                )
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

Search all news containing "bitcoin" and "bull run":

````typescript
import {WebsocketResponse, WsApi, and, text} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            filter: {
                query: and(
                    text("bitcoin"),
                    text("bull run")
                )
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