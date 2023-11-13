---
sidebar_position: 4
---

# Nesting queries

"and" and "or" queries can be nested.

## Usage
This query will retrieve news if any of the following is true:

- Mentions "bitcoin"
- Mentions "dogecoin" but not "elon musk":

````typescript
import {WebsocketResponse, WsApi, and, text, or} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            filter: {
                query: or(
                    text("bitcoin"),
                    and(
                        text("dogecoin"),
                        text("elon musk", {
                            ignore: true
                        })
                    )
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