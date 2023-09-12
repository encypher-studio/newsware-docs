---
sidebar_position: 1
---

# Filter

Filter is the first argument received by the subscribe function.

## Definition

```typescript
export interface Filter {
    query?: Query
    tickers?: string[]
    sources?: Source[]
}
```

All filters are optional, if none is passed then all recent news are received without filtering.

| Field   |                                Definition                                 |
|---------|:-------------------------------------------------------------------------:|
| query   |                Receives a query of type or, and, or text.                 |
| tickers | Receives a list of tickers. If any is present, then the news is received. |
| sources |    List of sources to receive news from, refer to [Sources](./sources)    |

## Usage

Subscribe to news that have the BTC or XRP tickers, or that mention "bitcoin" but not "ethereum":

```typescript
import {text, News, Api} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        tickers: ["BTC", "XRP"],
        query: and(
            text("bitcoin"),
            text("ethereum", {ignore: true})
        )
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```
