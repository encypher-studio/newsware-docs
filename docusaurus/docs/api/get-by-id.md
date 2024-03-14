---
sidebar_position: 2
---

# Get by ID

Get the complete record of a news by its id.

# Definition

```typescript
async getById(
    id: string,
    errorHandler?: (apiResponse: RestResponseError<News>),
): Promise<News> {
    ...
}
```

## Arguments

| Name         | Definition                                                                     | Required |
| ------------ | ------------------------------------------------------------------------------ | -------- |
| id           | The id of the news to fetch                                                    | ✅        |
| errorHandler | A custom handler for API errors, the default handler throws the received error |          |

# Usage

````typescript
import {Api} from "newsware";

const api = Api(apiKey)
const news = await api.getById("id")
````

With custom error handler:

````typescript
import {Api} from "newsware";

const api = Api(apiKey)
const news = await api.getById("non-existent-id", (apiResponse: RestResponseError<News>) => {
    console.log(apiResponse.error.message)
})
````