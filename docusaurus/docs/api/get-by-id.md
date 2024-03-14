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

| Name         | Definition                                                                                | Required |
| ------------ | ----------------------------------------------------------------------------------------- | -------- |
| id           | The id of the news to fetch                                                               | ✅        |
| errorHandler | (Optional) A custom handler for API errors, the default handler throws the received error |          |

# Usage

Refer to [Quick Start](./quick-start.md).