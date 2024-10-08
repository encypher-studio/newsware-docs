import { Code, Section } from "@newsware/ui";

export const ConditionFilter = () => {
  return (
    <>
      <Section title="Condition filter">
        <p>
          A condition filter can be used to create complex filters involving
          "Or", "And" and "And Not" conditions.
        </p>
      </Section>
      <Section title="Definition">
        <Code language="typescript">
          {`export function And/AndNot/Or(...queries: Filter[]): Filter {
    ...
}`}
        </Code>
      </Section>
      <Section title="Usage">
        <div className="grid gap-2">
          <p>Retrieve news that fulfill ANY of:</p>
          <ul className="ml-6 list-disc">
            <li>Mention "bitcoin".</li>
            <li>Has "BTC" as ticker.</li>
          </ul>
          <Code language="typescript">
            {`import {Field, WebsocketResponse, WsApi, Text, Or, Tickers} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: OrZ(
                Text.any("bitcoin"),
                Tickers.any(["BTC"]),
            )
        })
    },
    callback: (message: WebsocketResponse) => {
        if (message.method === WebsocketMethod.SUBSCRIBE
            && message.type === WebsocketResponseType.DATA) {
            // Do anything with the filtered news
        }
    }
})
wsApi.connect()`}
          </Code>

          <p>Retrieve news that fulfill ALL of:</p>
          <ul className="ml-6 list-disc">
            <li>Mentions "bitcoin" in the headline.</li>
            <li>Mentions "Satoshi Nakamoto" in the body.</li>
          </ul>
          <Code language="typescript">
            {`import {Field, WebsocketResponse, WsApi, And, Text} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: And(
                Text.any("bitcoin", {onlyHeadline: true}),
                Text.any("Satoshi Nakamoto", {onlyBody: true})
            )
        })
    },
    callback: (message: WebsocketResponse) => {
        if (message.method === WebsocketMethod.SUBSCRIBE
            && message.type === WebsocketResponseType.DATA) {
            // Do anything with the filtered news
        }
    }
})`}
          </Code>

          <p>Retrieve news that fulfill ALL of:</p>
          <ul className="ml-6 list-disc">
            <li>Don't mention "bitcoin" in the headline.</li>
            <li>Don't have "BTC" as ticker.</li>
          </ul>
          <Code language="typescript">
            {`import {Field, WebsocketResponse, WsApi, AndNot, Text} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: AndNot(
                Text.any("bitcoin", {onlyHeadline: true}),
                Tickers.any(["BTC"])
            )
        })
    },
    callback: (message: WebsocketResponse) => {
        if (message.method === WebsocketMethod.SUBSCRIBE
            && message.type === WebsocketResponseType.DATA) {
            // Do anything with the filtered news
        }
    }
})`}
          </Code>
        </div>
      </Section>
      <Section title="Usage: Nested conditions">
        <div className="grid gap-2">
          <p>Retrieve news that fulfill ANY of:</p>
          <ul className="ml-6 list-disc">
            <li>Mentions "bitcoin" AND NOT mentions "scam"</li>
            <li>Has "BTC" as ticker</li>
          </ul>
          <Code language="typescript">
            {`import {Field, WebsocketResponse, WsApi, And, Text, Or, Tickers} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: Or(
                And(
                    Text.any("bitcoin"),
                    Text.exclude("scam")
                ),
                Tickers.any(["BTC"])
            )
        })
    },
    callback: (message: WebsocketResponse) => {
        if (message.method === WebsocketMethod.SUBSCRIBE
            && message.type === WebsocketResponseType.DATA) {
            // Do anything with the filtered news
        }
    }
})`}
          </Code>
        </div>
      </Section>
    </>
  );
};
