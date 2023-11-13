---
sidebar_position: 1
---

# Quick start

This subscription retrieves news from Dow Jones and SEC if any of the following is true: 

* Mentions "bitcoin", or mentions "dogecoin" but not "elon musk":
* Have "BTC" or "XRP" as tickers.
* SEC filings related to 1805719 or 1557593 CIKs.

```typescript
import {text, WsApi, or, and, Source, WebsocketResponse} from "newsware";

const wsApi = new WsApi(apiKey, {
        // Subscribe once the connection is open
        openCallback: () => {
            wsApi.subscribe({
                subscriptionId: "trackableId",
                filter: {
                    sources: [Source.DowJones, Source.SEC],
                    query: or(
                        text("bitcoin"),
                        and(
                            text("dogecoin"),
                            text("elon musk", {
                                ignore: true
                            })
                        )
                    ),
                    tickers: ["BTC", "XRP"],
                    ciks: [1805719, 1557593]
                },
            })
        },
        callback: (message: WebsocketResponse) => {
            if (message.method === WebsocketMethod.SUBSCRIBE 
                && message.type === WebsocketResponseType.DATA) {
                // Do anything with the filtered news
            }
        }
})
