---
sidebar_position: 5
---

# Sources

It is possible to filter by news sources, the available sources are:

```typescript
export enum Source {
    DowJones = "DJ",
    AccessWire = "AR",
    GlobeNewswire = "PZ",
    PRNewswire = "PN",
    BusinessWire = "BW",
    SEC = "SEC",
    Hammerstone = "HS"
}
```

## Usage

This query will return all news from Dow Jones and Access Wire:

````typescript
import {WebsocketResponse, WsApi, Source} from "newsware";

const wsApi = new WsApi(apiKey, {
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            filter: {
                sources: [Source.DowJones, Source.AccessWire]
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
