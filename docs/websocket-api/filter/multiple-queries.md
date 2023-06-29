---
sidebar_position: 3
---

# Multiple queries

Multiple queries can be joined with And and Or conditions.

## Usage

Search all news containing "bitcoin" or "crypto" or "ethereum":

```typescript
import {Text, News, Api, Or, And} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        query: new Or([
            new Text({
                text: "bitcoin"
            }),
            new Text({
                text: "crypto"
            }),
            new Text({
                text: "ethereum"
            })
        ])
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```

Search all news containing "bitcoin" and "bull run":

```typescript
import {Text, News, Api, Or, And} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        query: new And([
            new Text({
                text: "bitcoin"
            }),
            new Text({
                text: "bull run"
            })
        ])
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```
