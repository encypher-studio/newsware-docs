import CategoryCodes from "@/components/category-codes/page"
import Sources from "@/components/sources/page"
import Installation from "@/components/typescript-client/installation/page"
import Connect from "@/components/typescript-client/websocket/connect/page"
import Considerations from "@/components/typescript-client/websocket/considerations/page"
import Examples from "@/components/typescript-client/websocket/examples/page"
import ConditionFilter from "@/components/typescript-client/websocket/filter/condition-filter/page"
import MetadataFilter from "@/components/typescript-client/websocket/filter/metadata-filter/page"
import TextFilter from "@/components/typescript-client/websocket/filter/text-filter/page"
import QuickStart from "@/components/typescript-client/websocket/quick-start/page"
import Subscribe from "@/components/typescript-client/websocket/subscribe/page"

export interface RouteOption {
    title: string
    component?: React.ReactNode
    options?: {
        [path: string]: RouteOption
    }
    targetBlank?: boolean
    forceExact?: boolean
}

export const APP_ROUTES = {
    "https://newsware.readme.io/": {
        title: "REST API",
        targetBlank: true
    },
    "asyncapi": {
        title: "Websocket API",
        forceExact: true,
        targetBlank: true
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
                    "filter": {
                        title: "Filter",
                        options: {
                            "text": {
                                title: "Text Filter",
                                component: <TextFilter />
                            },
                            "metadata": {
                                title: "Metadata Filter",
                                component: <MetadataFilter />
                            },
                            "condition": {
                                title: "Condition Filter",
                                component: <ConditionFilter />
                            }
                        }
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
    "sources": {
        title: "Sources",
        component: <Sources />
    }
}