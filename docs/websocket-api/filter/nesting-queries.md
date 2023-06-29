---
sidebar_position: 4
---

# Nesting queries

And and Or queries can be nested.

## Usage
Search all news containing "bitcoin" or containing "dogecoin" but not "elon musk":

```typescript
import {Text, News, Api, Or, And} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
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