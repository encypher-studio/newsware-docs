---
sidebar_position: 2
---

# Text filter

A text filter is used to search for texts inside the headline and body of the news. An object with options can be passed
alongside the values to search for.

## Definition

```typescript
export interface TextOptions {
    onlyBody?: boolean
    onlyHeadline?: boolean
}
```

| Field        |                             Definition                              | Default value | Required |
| ------------ | :-----------------------------------------------------------------: | ------------- | -------- |
| onlyHeadline | If true, the text will be searched only in the headline of the news | False         |          |
| onlyBody     |   If true, the text will be searched only in the body of the news   | False         |          |

## Usage

This query will retrieve headlines that mention "bitcoin" OR "ethereum", but exclude them if the body mention "scam":

````typescript
import {Field, WebsocketResponse, WsApi, And, Text} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: And(
                Text.any(["bitcoin", "ethereum"], {
                    onlyHeadline: true
                }),
                Text.exclude(["scam"], {
                    onlyBody: true
                })
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

