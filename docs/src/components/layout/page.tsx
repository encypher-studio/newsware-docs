import { PropsWithChildren, useEffect, useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { APP_ROUTES, RouteOption, RouteOption } from "@/lib/routes/routes";
import path from "path";

export default function Layout({ children }: PropsWithChildren) {
    const location = useLocation()
    const [currentPath, setCurrentPath] = useState<{
        sectionPath: string,
        optionPath?: string
        subOptionPath?: string
        section?: RouteOption,
        option?: RouteOption
        subOption?: RouteOption
    }>({ sectionPath: "" })

    useEffect(() => {
        const paths = location.pathname.split("/")
        let sectionPath = "/" + paths[1]
        const section = paths.length > 1 ? APP_ROUTES[paths[1]] : undefined

        let optionPath
        let option
        if (section?.options && paths.length > 2) {
            optionPath = "/" + paths[2]
            option = paths.length > 2 ? section.options[paths[2]] : undefined
        }

        let subOptionPath
        let subOption
        if (option?.options && paths.length > 3) {
            subOptionPath = "/" + paths[3]
            subOption = paths.length > 3 ? option.options[paths[3]] : undefined
        }

        setCurrentPath({
            subOption,
            subOptionPath,
            sectionPath,
            optionPath,
            section,
            option
        })
    }, [location])

    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <Sidebar />
            <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                <div className="mx-auto w-full min-w-0">
                    <Breadcrumb className="mb-4">
                        <BreadcrumbList>
                            {currentPath.section &&
                                <>
                                    <BreadcrumbItem className={(location.pathname === path.join(currentPath.sectionPath) ? "text-foreground font-medium" : "")}>
                                        <BreadcrumbLink href={currentPath.sectionPath}>{currentPath.section?.title}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {
                                        currentPath.option &&
                                        <>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem className={(location.pathname === path.join(currentPath.sectionPath, currentPath.optionPath!!) ? "text-foreground font-medium" : "")}>
                                                <BreadcrumbLink href={path.join(currentPath.sectionPath, currentPath.optionPath!!)}>{currentPath.option?.title}</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </>
                                    }
                                    {
                                        currentPath.subOption &&
                                        <>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem className={(location.pathname === path.join(currentPath.sectionPath, currentPath.optionPath!!, currentPath.subOptionPath!!) ? "text-foreground font-medium" : "")}>
                                                <BreadcrumbLink href={path.join(currentPath.sectionPath, currentPath.optionPath!!, currentPath.subOptionPath!!)}>{currentPath.subOption?.title}</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </>

                                    }
                                </>
                            }
                        </BreadcrumbList>
                    </Breadcrumb>
                    {children}
                </div>
            </main>
        </div>
    )
}
