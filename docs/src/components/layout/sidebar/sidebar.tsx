import { APP_ROUTES } from "@/lib/routes/routes"
import { Link, useLocation } from "react-router-dom"
import path from "path"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CaretSortIcon } from "@radix-ui/react-icons"

export default function Sidebar() {
    const location = useLocation()

    return (
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <div className="relative overflow-hidden h-full py-6 pr-6 lg:py-8">
                <div className="h-full w-full rounded-[inherit]">
                    <div className="min-width: 100%; display: table;">
                        <div className="w-full">
                            {
                                Object.keys(APP_ROUTES).map((sectionPath) => {
                                    const section = APP_ROUTES[sectionPath]
                                    return (
                                        <div className="pb-4">
                                            <Collapsible key={section.title} className="grid grid-flow-row auto-rows-max text-sm">
                                                <CollapsibleTrigger asChild>
                                                    <Link className={(!section.component && !sectionPath.startsWith("http") && !section.forceExact && !section.options ? "pointer-events-none" : "") + " group flex w-full items-center rounded-md border border-transparent py-1 hover:underline"}
                                                        to={sectionPath} target={sectionPath?.startsWith("http") || section.forceExact ? "_blank" : ""}>
                                                        {section.title}  {section.options ? <CaretSortIcon className="" /> : <></>}
                                                    </Link>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    {section.options && Object.keys(section.options).map((optionPath) => {
                                                        const option = section.options!![optionPath]
                                                        return <Collapsible key={section.title} className="grid grid-flow-row auto-rows-max text-sm">
                                                            <CollapsibleTrigger asChild>
                                                                <Link
                                                                    key={optionPath}
                                                                    className={(path.join(sectionPath, optionPath) === location.pathname ? "font-medium text-foreground" : "text-muted-foreground") + " group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline"}
                                                                    to={path.join(sectionPath, optionPath)}>
                                                                    {option.title} {option.options ? <CaretSortIcon className="h-4 w-4" /> : <></>}
                                                                </Link>
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent>
                                                                {
                                                                    option.options && Object.keys(option.options).map((subOptionPath) => {
                                                                        const subOption = option.options!![subOptionPath]
                                                                        return (
                                                                            <Link
                                                                                key={subOptionPath}
                                                                                className={(path.join(sectionPath, optionPath, subOptionPath) === location.pathname ? "font-medium text-foreground" : "text-muted-foreground") + " group flex w-full items-center rounded-md border border-transparent px-4 py-1 hover:underline"}
                                                                                to={path.join(sectionPath, optionPath, subOptionPath)}>
                                                                                {subOption.title}
                                                                            </Link>
                                                                        )
                                                                    })
                                                                }
                                                            </CollapsibleContent>
                                                        </Collapsible>
                                                    })}
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
