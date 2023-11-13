---
sidebar_position: 2
---

# Text query

A "text" query receives a text and optional options on where and how to look for it.

## Definition

```typescript
export interface TextOptions {
    onlyBody?: boolean
    onlyHeadline?: boolean
    ignore?: boolean
}
```

| Field        |                                                               Definition                                                                | Default value | Required |
|--------------|:---------------------------------------------------------------------------------------------------------------------------------------:|---------------|----------|
| onlyHeadline |                                   If true, the text will be searched only in the headline of the news                                   | False         |          |
| onlyBody     |                                     If true, the text will be searched only in the body of the news                                     | False         |          |
| ignore       | Whether to ignore matches. For example, if you choose to ignore the text “bitcoin”, then no news that mention bitcoin will be received. | False         |          |

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
                        onlyHeadline: true,
                        ignore: false
                    }),
                    text("scam", {
                        onlyBody: true,
                        ignore: true
                    })
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

