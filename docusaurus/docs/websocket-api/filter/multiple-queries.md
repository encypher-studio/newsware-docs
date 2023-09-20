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
api.subscribe({
    filter: {
        query: or(
            text("bitcoin"),
            text("crypto"),
            text("ethereum")
        )
    },
    callback: (news: News) => {
        // Do anything with the filtered news
    }
})
```

Search all news containing "bitcoin" and "bull run":

```typescript
import {text, News, Api, and} from "newsware";

const api = new Api(apiKey)
api.subscribe({
    filter: {
        query: and(
            text("bitcoin"),
            text("bull run")
        )
    },
    callback: (news: News) => {
        // Do anything with the filtered news
    }
})
```
