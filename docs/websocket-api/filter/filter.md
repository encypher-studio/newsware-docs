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

| Field   |                                             Definition                                              |
|---------|:---------------------------------------------------------------------------------------------------:|
| query   |                           Receives a query of type TextQuery, And, or Or.                           |
| tickers | Receives a list of tickers to search in the metadata. If any is present, then the news is received. |
| sources |                 List of sources to receive news from, refer to [Sources](./sources)                 |

## Usage

Subscribe to news that have the BTC or XRP tickers, or that mention "bitcoin":

```typescript
import {text, News, Api} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        tickers: ["BTC", "XRP"],
        query: text("bitcoin")
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```
