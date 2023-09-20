---
sidebar_position: 4
---

# Nesting queries

"and" and "or" queries can be nested.

## Usage
Search all news containing "bitcoin" or containing "dogecoin" but not "elon musk":

```typescript
import {text, News, Api, or, and} from "newsware";

const api = new Api(apiKey)
api.subscribe({
    filter: {
        query: or(
            text("bitcoin"),
            and(
                text("dogecoin"),
                text("elon musk", {
                    ignore: true
                })
            )
        )
    },
    callback: (news: News) => {
        // Do anything with the filtered news
    }
})
```