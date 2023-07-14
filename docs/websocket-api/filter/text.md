---
sidebar_position: 2
---

# Text query

A "text" query receives a text and optional options on where and how to look for it.

## Definition

```typescript
export interface TextOptions {
    searchBody?: boolean // defaults to true
    searchHeadline?: boolean // defaults to true
    isRegex?: boolean, // defaults to false
    ignore?: boolean // defaults to false
}
```

| Field          |                                                                                                                Definition                                                                                                                | Default value | Required |
|----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|---------------|----------|
| searchHeadline |                                                              If true, the text will be searched in the headline, if false, the headline will be skipped during the search.                                                               | True          |          |
| searchBody     |                                                            If true, the text will be searched in the body of the news, if false, the body will be skipped during the search.                                                             | True          |          |
| isRegex        |                                          Whether the text is a regex pattern, if true, the search will be performed using the regex pattern, otherwise the text will be searched as a literal.                                           | False         |          |
| ignore         | Whether to ignore matches. If true, if a match is found then that record will be ignored and not sent to the WS connection. For example, if you choose to ignore the text “bitcoin”, then no news that mention bitcoin will be received. | False         |          |

## Usage

This query will use regex to retrieve headlines starting with "bitcoin":

```typescript
import {text, News, Api} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        query: text("^bitcoin", {
            searchBody: false,
            searchHeadline: true,
            isRegex: true,
            ignore: false
        })
    },
    (news: News) => {
        // Do anything with the filtered news
    }
)
```

