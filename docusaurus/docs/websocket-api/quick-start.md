---
sidebar_position: 1
---

# Quick start

This subscription retrieves: 

* Only news from Dow Jones.
* News that mention "bitcoin", or if they mention "dogecoin" but not "elon musk":
* News that have "BTC" or "XRP" as tickers.
* SEC filings related to 1805719 or 1557593 CIKs.

```typescript
import {text, News, Api, or, and, Source} from "newsware";

const api = new Api(apiKey)
api.subscribe({
    filter: {
        sources: [Source.DowJones],
        query: or(
            text("bitcoin"),
            and(
                text("dogecoin"),
                text("elon musk", {
                    ignore: true
                })
            )
        ),
        tickers: ["BTC", "XRP"],
        ciks: [1805719, 1557593]
    },
    callback: (news: News) => {
        // Do anything with the filtered news
    }
})
