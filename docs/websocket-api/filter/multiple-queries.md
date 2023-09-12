---
sidebar_position: 3
---

# Multiple queries

Multiple queries can be joined with "and" and "or" conditions.

## Usage

Search all news containing "bitcoin" or "crypto" or "ethereum":

```typescript
import {text, News, Api, or} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        query: or(
            text("bitcoin"),
            text("crypto"),
            text("ethereum")
        )
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```

Search all news containing "bitcoin" and "bull run":

```typescript
import {text, News, Api, and} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        query: and(
            text("bitcoin"),
            text("bull run")
        )
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```
