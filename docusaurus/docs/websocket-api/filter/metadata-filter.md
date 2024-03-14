---
sidebar_position: 3
---

# Metadata filter

A metadata filter can be used to filter news by: Tickers, Sources, CategoryCodes, and Ciks (only for SEC filings).

## Usage

This query will retrieve if ANY is true:

* Has "BTC" AND "ETH" as tickers.
* Does NOT belong to the DowJones (DJ) NOR Hammerstone (HS) sources.
* Has the Mergers & Acquisitions (MA) OR FOREX category codes.
* Has as Ciks 1805719 AND 1557593

````typescript
import {Field, WebsocketResponse, WsApi, Or, Tickers, Sources, CategoryCodes, Ciks} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: Or(
                Tickers.all(["BTC", "ETH"]),
                Sources.exclude(["DJ", "HS"]),
                CategoryCodes.any(["MA", "FOREX"]),
                Ciks.all[1805719, 1557593]
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

