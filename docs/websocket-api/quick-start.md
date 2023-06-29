---
sidebar_position: 1
---

# Quick start

Example of a websocket subscription:

```typescript
import {Text, News, Api, Or, And} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        tickers: ["BTC", "XRP"],
        query: new Or([
            new Text({
                text: "bitcoin"
            }),
            new And([
                new Text({
                    text: "dogecoin"
                }),
                new Text({
                    text: "elon musk",
                    ignore: true
                })
            ])
        ])
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```

Translates to the condition:

```
(tickers cointains "BTC" OR "XRP")
OR 
((mentions "bitcoin") OR (mentions "dogecoing" AND NOT mentions "elon musk"))
```
