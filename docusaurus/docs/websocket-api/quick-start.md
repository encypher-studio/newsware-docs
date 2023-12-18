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
import {text, WsApi, Or, And, Source, WebsocketResponse, Sources, Text, Tickers, Ciks} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
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
    callback: (message: WebsocketResponse) => {
        if (message.method === WebsocketMethod.SUBSCRIBE
            && message.type === WebsocketResponseType.DATA) {
            // Do anything with the filtered news
        }
    }
})
```