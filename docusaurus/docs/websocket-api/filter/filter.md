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
| sources |    List of sources to receive news from, refer to [Sources](./sources)    |
| tickers |     A list of tickers. If any is present, then the news is received.      |
| ciks    | A list of CIKs. If any is present in the SEC filing, it will be received. |

## Usage

This subscription will return:
* News that mention "bitcoin" but not "ethereum".
* News that have BTC or XRP tickers
* SEC filings related to 1805719 or 1557593 CIKs.

```typescript
import {text, News, Api} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        query: and(
            text("bitcoin"),
            text("ethereum", {ignore: true})
        ),
        tickers: ["BTC", "XRP"],
        ciks: [1805719, 1557593]
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```
