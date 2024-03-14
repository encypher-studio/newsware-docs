---
sidebar_position: 1
---

# Filter

In order to search for news containing a specific text or metadata, a filter must be provided when subscribing or
performing a historical search.

A filter can be of type [TextFilter](./text-filter.md) and [MetadataFilter](./metadata-filter.md).

A filter can also consist of multiple filters joined by a [ConditionFilter](./condition-filter.md).

A filter can perform 3 actions:

* any: returns the news if any of the values is present.
* all: returns the news if all values are present.
* exclude: returns if none of the values are present.

## Usage

This subscription will return the news if any is true:

* Mentions "bitcoin" AND "bull run", AND doesn't mention "scam" AND "cash grab".
* Has BTC or XRP tickers
* SEC filings with 1805719 or 1557593 CIKs.

````typescript
import {Field, WebsocketResponse, WsApi, And, Text, Ciks, Tickers} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: Or(
                And(
                    Text.all(["bitcoin", "bull run"]),
                    Text.exclude(["scam", "cash grab"])
                ),
                Tickers.any(["BTC", "XRP"]),
                Ciks.any([1805719, 1557593])
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
wsApi.connect()
````
