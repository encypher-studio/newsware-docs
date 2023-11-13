---
sidebar_position: 2
---

# Text query

A "text" query receives a text and optional options on where and how to look for it.

## Definition

```typescript
export interface TextOptions {
    searchBody?: boolean // defaults to true
    searchHeadline?: boolean // defaults to true
    ignore?: boolean // defaults to false
}
```

| Field          |                                                                                                                Definition                                                                                                                | Default value | Required |
|----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|---------------|----------|
| searchHeadline |                                                              If true, the text will be searched in the headline, if false, the headline will be skipped during the search.                                                               | True          |          |
| searchBody     |                                                            If true, the text will be searched in the body of the news, if false, the body will be skipped during the search.                                                             | True          |          |
| ignore         | Whether to ignore matches. If true, if a match is found then that record will be ignored and not sent to the WS connection. For example, if you choose to ignore the text “bitcoin”, then no news that mention bitcoin will be received. | False         |          |

## Usage

This query will retrieve headlines that mention "bitcoin", but ignore them if the body mentions "scam":

````typescript
import {WebsocketResponse, WsApi, and, text} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            filter: {
                query: and(
                    text("bitcoin", {
                        searchBody: false,
                        searchHeadline: true,
                        ignore: false
                    }),
                    text("scam", {
                        searchBody: true,
                        searchHeadline: false,
                        ignore: true
                    })
                )            }
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

