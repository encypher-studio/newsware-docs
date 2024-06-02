import { DataTable } from "@/components/category-codes/data-table";
import Code from "@/components/code/code";
import Section from "@/components/section/section";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

interface WsApiOptionsColumn {
    name: string
    definition: string
    required: boolean
}

const wsApiOptionsColumns: ColumnDef<WsApiOptionsColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "definition",
        header: "Definition",
    },
    {
        accessorKey: "required",
        header: "Required",
        accessorFn: (row: WsApiOptionsColumn) => row.required ? '\u2705' : "",
    },
]

interface wsResponseColumn {
    name: string
    definition: string
}

const wsResponseColumns: ColumnDef<wsResponseColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "definition",
        header: "Definition",
    },
]

const wsResponse: wsResponseColumn[] = [
    {
        name: "method",
        definition: `Method the message belongs to, for subscription it will be "subscription".`
    },
    {
        name: "type",
        definition: `The type of the message. This will be either "ok" to acknowledge a request, "error" to report an error, or "data" to deliver data in case of subscription.`
    },
    {
        name: "id",
        definition: "The ID of the message. This is used to match responses to requests."
    },
    {
        name: "data",
        definition: "The data of the message. This depends on the method used."
    },
]

const wsResponseError: wsResponseColumn[] = [
    {
        name: "message",
        definition: `Error message.`
    },
]

const wsApiOptions: WsApiOptionsColumn[] = [
    {
        name: "apiKey",
        definition: "The API key to authenticate with the websocket API.",
        required: true
    },
    {
        name: "callback",
        definition: "The callback function to handle incoming messages.",
        required: true
    },
    {
        name: "errorCallback",
        definition: "The callback function to handle errors.",
        required: false
    },
    {
        name: "openCallback",
        definition: "The callback function to handle the websocket connection being opened.",
        required: false
    },
    {
        name: "closeCallback",
        definition: "The callback function to handle the websocket connection being closed.",
        required: false
    },
    {
        name: "reconnect",
        definition: "(Defaults to true)  Whether to automatically reconnect if the connection is lost.",
        required: false
    },
    {
        name: "reconnectDelay",
        definition: "(Defaults to 1000) The delay in milliseconds between reconnection attempts.",
        required: false
    },
]

export default function Connect() {
    return (
        <>
            <Section title="Connect" >
                <p>
                    To establish a connection to the websocket API, first create a WsApi instance, and then call its connect() method.
                </p>
            </Section>
            <Section title="Definition" >
                <p>
                    The WsApi constructor is defined as follows:
                </p>
                <Code language="typescript">
                    {`export class WsApi {
...

    constructor(
        options: {
            apiKey: string,
            callback: (response: WebsocketResponse) => void,
            errorCallback?: (error: WebsocketErrorResponse) => void,
            openCallback?: () => void,
            closeCallback?: (closeEvent: CloseEvent) => void,
            reconnect?: boolean,
            endpoint?: EndpointDescription,
            reconnectDelay?: number,
        }
    ) { ...
    }

    connect() {
        ...
    }
...
}`}
                </Code>
            </Section>
            <Section title="WS API Options">
                <DataTable columns={wsApiOptionsColumns} data={wsApiOptions} />
            </Section>
            <Section title="WebsocketResponse" id="WebsocketResponse">
                <DataTable columns={wsResponseColumns} data={wsResponse} />
            </Section>
            <Section title="WebsocketErrorResponse">
                <p className="pb-6">
                    It's a <Link to="#WebsocketResopnse" className="text-accent">WebsocketResponse</Link> with a value of type:
                </p>
                <DataTable columns={wsResponseColumns} data={wsResponseError} />
            </Section>
            <Section title="Usage">
                Refer to <Link to={"/typescript-client/websocket/quick-start"} className="text-accent">Quick Start</Link>
            </Section>
        </>
    )
}
