import { FieldDefinitionColumn, fieldDefinitionColumn } from "@/lib/types";
import { Code, DataTable, Section } from "@newsware/ui";
import { actionTable } from "../../common";

const textOptions: FieldDefinitionColumn[] = [
  {
    name: "onlyHeadline",
    definition:
      "(Default: false) If true, the text will be searched only in the headline of the news.",
    required: false,
  },
  {
    name: "onlyBody",
    definition:
      "(Default: false) If true, the text will be searched only in the body of the news.",
    required: false,
  },
];

export const TextFilter = () => {
  return (
    <>
      <Section title="Text filter">
        <p>
          A text filter is used to search for texts inside the headline and body
          of the news. An object with options can be passed alongside the values
          to search for.
        </p>
      </Section>
      <Section title="Definition">
        <Code language="typescript">
          {`export class Text {
    constructor() {
    }

    static any(value: string[] | string, options?: TextOptions): FilterText {
        ...
    }

    static all(value: string[] | string, options?: TextOptions) {
        ...
    }

    static exclude(value: string[] | string, options?: TextOptions) {
        ...
    }
}`}
        </Code>
      </Section>
      <Section title="Methods">{actionTable()}</Section>
      <Section title="TextOptions">
        <DataTable columns={fieldDefinitionColumn} data={textOptions} />
      </Section>
      <Section title="Usage">
        <div className="grid gap-2">
          <p>
            This query will retrieve headlines that mention "bitcoin" OR
            "ethereum", but exclude them if the body mentions "scam":
          </p>
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
                Text.any(["bitcoin", "ethereum"], {
                    onlyHeadline: true
                }),
                Text.exclude(["scam"], {
                    onlyBody: true
                })
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
        </div>
      </Section>
    </>
  );
};
