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
    BusinessWire = "BW"
}
```

## Usage

This query will return all news from Dow Jones and Access Wire:

```typescript
import {Api, News, Source} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        sources: [Source.DowJones, Source.AccessWire]
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```

