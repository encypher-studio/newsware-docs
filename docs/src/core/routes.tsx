import {
  Codes,
  ConditionFilter,
  Connect,
  Considerations,
  Docs,
  Examples,
  Installation,
  MetadataFilter,
  QuickStart,
  Sources,
  Subscribe,
  TextFilter,
} from "@/components"
import { ServiceProvider } from "@/lib/context/service"
import { IEnvironment, RouteOption } from "@newsware/ui"
import { Outlet } from "react-router-dom"

export const appRoutes = (environment: IEnvironment): RouteOption[] => [
  {
    title: "",
    element: (
      <ServiceProvider environment={environment}>
        <Outlet />
      </ServiceProvider>
    ),
    children: [
      {
        title: "REST API",
        targetBlank: true,
        path: "https://newsware.readme.io/",
      },
      {
        title: "Websocket API",
        forceExact: true,
        path: "asyncapi",
        targetBlank: true,
      },
      {
        title: "Home",
        path: "/",
        element: <Docs />,
        excludeFromSidebar: true,
      },
      {
        title: "Typescript Client",
        path: "typescript-client",
        children: [
          {
            title: "Installation",
            path: "installation",
            element: <Installation />,
          },
          {
            title: "Websocket",
            path: "websocket",
            children: [
              {
                title: "Quick Start",
                element: <QuickStart />,
                path: "quick-start",
              },
              {
                title: "Connect",
                element: <Connect />,
                path: "connect",
              },
              {
                title: "Filter",
                path: "filter",
                children: [
                  {
                    title: "Text Filter",
                    element: <TextFilter />,
                    path: "text",
                  },
                  {
                    title: "Metadata Filter",
                    element: <MetadataFilter />,
                    path: "metadata",
                  },
                  {
                    title: "Condition Filter",
                    element: <ConditionFilter />,
                    path: "condition",
                  },
                ],
              },
              {
                title: "Subscribe",
                element: <Subscribe />,
                path: "subscribe",
              },
              {
                title: "Examples",
                element: <Examples />,
                path: "examples",
              },
              {
                title: "Considerations",
                element: <Considerations />,
                path: "considerations",
              },
            ],
          },
        ],
      },
      {
        title: "Codes",
        element: <Codes />,
        path: "codes",
      },
      {
        title: "Sources",
        element: <Sources />,
        path: "sources",
      },
    ],
  },
];
