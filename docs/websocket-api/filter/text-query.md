---
sidebar_position: 2
---

# TextQuery

TextQuery is the minimum query object, it describes a text, where to look for it and how.

## Definition

```typescript
export interface TextQuery {
    text: string,
    searchBody?: boolean // defaults to true
    searchHeadline?: boolean // defaults to true
    isRegex?: boolean, // defaults to false
    ignore?: boolean // defaults to false
}
```

| Field          |                                                                                                                Definition                                                                                                                | Default value | Required |
|----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|---------------|----------|
| text           |                                                                     The text to search for. It is case insensitive, all search and news text is forced to lowercase.                                                                     |               | ✅        |
| searchHeadline |                                                              If true, the text will be searched in the headline, if false, the headline will be skipped during the search.                                                               | True          |          |
| searchBody     |                                                            If true, the text will be searched in the body of the news, if false, the body will be skipped during the search.                                                             | True          |          |
| isRegex        |                                          Whether the text is a regex pattern, if true, the search will be performed using the regex pattern, otherwise the text will be searched as a literal.                                           | False         |          |
| ignore         | Whether to ignore matches. If true, if a match is found then that record will be ignored and not sent to the WS connection. For example, if you choose to ignore the text “bitcoin”, then no news that mention bitcoin will be received. | False         |          |

## Usage

This query will search for all headlines starting with "bitcoin":

```typescript
import {Text, News, Api, Or, And} from "newsware";

const api = new Api(apiKey)
api.subscribe(
    {
        query: new Text({
            text: "^bitcoin",
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

