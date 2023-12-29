---
sidebar_position: 4
---

# Condition filter

A condition filter can be used to create complex filters involving "Or" and "And" conditions.

## Usage

Retrieve news that fulfill ANY of:

* mention "bitcoin".
* Has "BTC" as ticker.

````typescript
import {Field, WebsocketResponse, WsApi, Text, Or, Tickers} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: OrZ(
                Text.any("bitcoin"),
                Tickers.any(["BTC"]),
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
````

Retrieve news that fulfill ALL of:

* Mentions "bitcoin" in the headline.
* Mentions "Satoshi Nakamoto" in the body.

````typescript
import {Field, WebsocketResponse, WsApi, And, Text} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: And(
                Text.any("bitcoin", {onlyHeadline: true}),
                Text.any("Satoshi Nakamoto", {onlyBody: true})
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
````

## Usage: Nested conditions

Retrieve news that fulfills ANY of:

* Mentions "bitcoin" AND NOT mentions "scam"
* Has "BTC" as ticker

````typescript
import {Field, WebsocketResponse, WsApi, And, Text, Or, Tickers} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: Or(
                And(
                    Text.any("bitcoin"),
                    Text.exclude("scam")
                ),
                Tickers.any(["BTC"])
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
````