import { DataTable } from "@/components/category-codes/data-table";
import Code from "@/components/code/code";
import Section from "@/components/section/section";
import { APP_ROUTES } from "@/lib/routes/routes";
import { FieldDefinitionColumn, fieldDefinitionColumn } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { actionTable } from "../../common";

export default function MetadataFilter() {
    return (
        <>
            <Section title="Metadata filter" >
                <p>
                    A metadata filter can be used to filter news by: Tickers, Sources, CategoryCodes, and Ciks (only for SEC filings).
                </p>
            </Section>
            <Section title="Definition">
                <Code language="typescript">
                    {`export class Tickers/CategoryCodes/Sources/Ciks {
    static any(value: string | string[]) {
        ...
    }

    static all(value: string | string[]) {
        ...
    }

    static exclude(value: string | string[]) {
        ...
    }
}`}
                </Code>
            </Section>
            <Section title="Methods">
                {actionTable()}
            </Section>
            <Section title="Usage">
                <p>
                    This query will retrieve if ANY is true:

                    <ul className="mt-6 ml-6 list-disc">
                        <li>
                            Has "BTC" AND "ETH" as tickers.
                        </li>
                        <li>
                            Does NOT belong to the DowJones (DJ) NOR Hammerstone (HS) sources.
                        </li>
                        <li>
                            Has the Mergers & Acquisitions (MA) OR FOREX category codes.
                        </li>
                        <li>
                            Has as Ciks 1805719 AND 1557593
                        </li>
                    </ul>
                </p>
                <Code language="typescript">
                    {`import {Field, WebsocketResponse, WsApi, Or, Tickers, Sources, CategoryCodes, Ciks} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY],
            filter: Or(
                Tickers.all(["BTC", "ETH"]),
                Sources.exclude(["DJ", "HS"]),
                CategoryCodes.any(["MA", "FOREX"]),
                Ciks.all[1805719, 1557593]
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
            </Section>
        </>
    )
}
