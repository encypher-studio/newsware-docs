import CategoryCodes from "@/components/category-codes/page"
import Installation from "@/components/typescript-client/installation/page"
import QuickStart from "@/components/typescript-client/websocket/quick-start/page"

export interface RouteOption {
    title: string
    component?: React.ReactNode
    options?: {
        [path: string]: RouteOption
    }
    forceExact?: boolean
}

export const APP_ROUTES: { [path: string]: RouteOption } = {
    "docs": {
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
                    "subscribe": {
                        title: "Subscribe"
                    },
                    "unsubscribe": {
                        title: "Unsubscribe"
                    },
                    "disconnect": {
                        title: "Disconnect"
                    }
                }
            }
        },
    },
    "category-codes": {
        title: "Category Codes",
        component: <CategoryCodes />
    },
    "https://newsware.readme.io/": {
        title: "REST API"
    },
    "asyncapi": {
        title: "Websocket API",
        forceExact: true
    },
}