import { DataTable } from "@/components/category-codes/data-table";
import Code from "@/components/code/code";
import Section from "@/components/section/section";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Link } from "react-router-dom";

interface SubscribeArguments {
    name: string
    definition: string | React.ReactNode
    required: boolean
}

const wsSubscribeArguments: ColumnDef<SubscribeArguments>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "definition",
        header: "Definition",
        cell: ({ row }) => {
            return row.getValue("definition")
        },
    },
    {
        accessorKey: "required",
        header: "Required",
        accessorFn: (row: SubscribeArguments) => row.required ? '\u2705' : "",
    },
]

const subscribeArguments: SubscribeArguments[] = [
    {
        name: "subscriptionId",
        definition: "The ID of the subscription. The responses will have this same ID to match the request with the response.",
        required: true
    },
    {
        name: "fields",
        definition: "A list of fields to retrieve from the news. Id is always returned.",
        required: true
    },
    {
        name: "filter",
        definition: <div>An object used to filter news, refer to <Link to="/typescript-client/websocket/filter" className="text-accent">Filter</Link>.</div>,
        required: false
    }
]

export default function Subscribe() {
    return (
        <>
            <Section title="Subscribe" >
                <p>
                    The subscribe function is used to subscribe to news updates using the Websocket API.
                </p>
            </Section>
            <Section title="Definition">
                <Code language="typescript">
                    {`function subscribe(
    options: {
        subscriptionId: string
        filter: Filter
    },
    resubscribeOnReconnect: boolean = true
) {
...
}`}
                </Code>
                <div className="pb-6"></div>
                <DataTable columns={wsSubscribeArguments} data={subscribeArguments} />
            </Section>
            <Section title="Fields">
                <p>
                    The available fields are:
                </p>
                <Code language="typescript">
                    {`export enum Field {
    HEADLINE = "headline",
    BODY = "body",
    TICKERS = "tickers",
    SOURCE = "source",
    PUBLICATION_TIME = "publicationTime",
    RECEIVED_TIME = "receivedTime",
    CREATION_TIME = "creationTime",
    CATEGORY_CODES = "categoryCodes",
    CIKS = "ciks",
    LINK = "link"
}`}
                </Code>
            </Section>
            <Section title="Usage">
                <p>
                    This subscription returns all unfiltered news and implements all callbacks:
                </p>
                <Code language="typescript">
                    {`import {WebsocketResponse, WsApi, Field} from "newsware";

const wsApi = new WsApi({
    apiKey: apiKey,
    // Subscribe once the connection is open
    openCallback: () => {
        wsApi.subscribe({
            subscriptionId: "trackableId",
            fields: [Field.HEADLINE, Field.BODY], // Add extra fields to retrieve here
            filter: {
                // Add filters here
            }
        })
    },
    // Receive messages from the server
    callback: (message: WebsocketResponse) => {
        if (message.method === WebsocketMethod.SUBSCRIBE
            && message.type === WebsocketResponseType.DATA) {
            // Do anything with the filtered news
            console.log(message.value)
        }
    },
    // (Optional) Throw errors and log to console
    errorCallback: (message: WebsocketErrorResponse) => {
        console.log("Websocket error: " + message.value.message)
        throw Error(message.value.message)
    },
    // (Optional) Log when connection closes
    closeCallback: (_: CloseEvent) => {
        console.log("Connection closed")
    },
    // (Optional, default is true) If true, attempts to reconnect if connection is unexpectedly closed.
    reconnect: true,
    // (Optional, default is 1000) Milliseconds to wait before attempting a reconnect.
    reconnectDelay: 1000
})
wsApi.connect()`}
                </Code>
            </Section>
        </>
    )
}
