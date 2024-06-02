import { APP_ROUTES, RouteOption } from "@/lib/routes/routes"
import { Link, useLocation } from "react-router-dom"
import path from "path"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CaretSortIcon } from "@radix-ui/react-icons"

export default function Sidebar() {
    const location = useLocation()

    const getOptions = (routes: { [path: string]: RouteOption }, prefixPath: string): React.ReactNode[] => {
        let indentation = prefixPath.split("/").length
        if (prefixPath === "") {
            indentation = 0
        }

        const nodes = []
        for (const optionPath in routes) {
            const option = routes[optionPath]

            const content = []
            if (option.options) {
                content.push(...getOptions(option.options, path.join(prefixPath, optionPath)))
            }

            console.log(location.pathname, path.join("/", prefixPath, optionPath), location.pathname === path.join("/", prefixPath, optionPath))
            nodes.push(<Collapsible key={option.title} className="grid grid-flow-row auto-rows-max text-sm" defaultOpen={location.pathname.startsWith(path.join("/", prefixPath, optionPath))}>
                <CollapsibleTrigger asChild>
                    <Link
                        key={optionPath}
                        className={(" pl-" + indentation * 2)
                            + (prefixPath === "" ? " pt-2" : " text-muted-foreground")
                            + (location.pathname.startsWith(path.join("/", prefixPath, optionPath)) ? "font-medium text-foreground" : "")
                            + " group flex w-full items-center rounded-md border border-transparent py-1 hover:underline"
                        }
                        to={optionPath.startsWith("http") || option.component ? path.join(prefixPath, optionPath) : location.pathname}
                        target={option.targetBlank ? "_blank" : ""}>
                        {option.title} {option.options ? <CaretSortIcon className="h-4 w-4" /> : <></>}
                    </Link>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {content.map((node) => node)}
                </CollapsibleContent>
            </Collapsible >)
        }

        return nodes
    }

    return (
        <aside className="fixed z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <div className="relative overflow-hidden h-full py-6 pr-6 lg:py-8">
                <div className="h-full w-full rounded-[inherit]">
                    <div className="min-width: 100%; display: table;">
                        <div className="w-full">
                            {
                                getOptions(APP_ROUTES, "").map((node) => node)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
