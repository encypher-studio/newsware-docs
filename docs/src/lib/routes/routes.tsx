import CategoryCodes from "@/components/category-codes/page"
import Installation from "@/components/typescript-client/installation/page"
import Connect from "@/components/typescript-client/websocket/connect/page"
import Considerations from "@/components/typescript-client/websocket/considerations/page"
import Examples from "@/components/typescript-client/websocket/examples/page"
import QuickStart from "@/components/typescript-client/websocket/quick-start/page"
import Subscribe from "@/components/typescript-client/websocket/subscribe/page"

export interface RouteOption {
    title: string
    component?: React.ReactNode
    options?: {
        [path: string]: RouteOption
    }
    forceExact?: boolean
}

export const APP_ROUTES: { [path: string]: RouteOption } = {
    "https://newsware.readme.io/": {
        title: "REST API"
    },
    "asyncapi": {
        title: "Websocket API",
        forceExact: true
    },
    "typescript-client": {
        title: "Typescript Client",
        options: {
            "installation": {
                title: "Installation",
                component: <Installation />
            },
            "websocket": {
                title: "Websocket",
                options: {
                    "quick-start": {
                        title: "Quick Start",
                        component: <QuickStart />
                    },
                    "connect": {
                        title: "Connect",
                        component: <Connect />
                    },
                    "unsubscribe": {
                        title: "Unsubscribe"
                    },
                    "subscribe": {
                        title: "Subscribe",
                        component: <Subscribe />
                    },
                    "examples": {
                        title: "Examples",
                        component: <Examples />
                    },
                    "considerations": {
                        title: "Considerations",
                        component: <Considerations />
                    }
                }
            }
        },
    },
    "category-codes": {
        title: "Category Codes",
        component: <CategoryCodes />
    },
}