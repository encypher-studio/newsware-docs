---
sidebar_position: 1
---

# Quick start

This subscription only retrieves news from Dow Jones. It retrieves them if they contain "BTC" or "XRP" as tickers.
They are also retrieved if they mention "bitcoin", or if they mention "dogecoin" but not "elon musk":

```typescript
import {text, News, Api, or, and, Source} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        sources: [Source.DowJones],
        tickers: ["BTC", "XRP"],
        query: or([
            text("bitcoin"),
            and([
                text("dogecoin"),
                text("elon musk", {
                    ignore: true
                })
            ])
        ])
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
