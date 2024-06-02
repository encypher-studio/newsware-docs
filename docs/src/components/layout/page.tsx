import { APP_ROUTES, RouteOption } from "@/lib/routes/routes";
import path from "path";
import { PropsWithChildren, useState } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import Sidebar from "./sidebar/sidebar";

export default function Layout({ children }: PropsWithChildren) {
    const location = useLocation()

    const getBreadcrumb = (routes: { [path: string]: RouteOption }, prefixPath: string): React.ReactNode[] => {
        const breadcrumbItems: React.ReactNode[] = []
        const activePaths = location.pathname.replace(prefixPath, "").split("/")
        while (activePaths[0] === "") {
            activePaths.shift()
        }
        if (activePaths.length === 0) {
            return breadcrumbItems
        }
        let currentRoute = routes[activePaths[0]]

        breadcrumbItems.push(
            <BreadcrumbSeparator />
        )

        breadcrumbItems.push(
            <BreadcrumbItem className={(location.pathname === path.join("/", prefixPath, activePaths[0]) ? "text-foreground font-medium" : "")}>
                <BreadcrumbLink
                    href={path.join("/", prefixPath, activePaths[0])}
                    className={activePaths[0].startsWith("http") || currentRoute.component ? "" : " pointer-events-none"}
                >
                    {currentRoute.title}
                </BreadcrumbLink>
            </BreadcrumbItem>
        )

        if (currentRoute.options) {
            breadcrumbItems.push(...getBreadcrumb(currentRoute.options, path.join(prefixPath, activePaths[0])))
        }

        if (prefixPath === "") {
            breadcrumbItems.shift()
        }

        return breadcrumbItems
    }

    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <Sidebar />
            <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                <div className="mx-auto w-full min-w-0">
                    <Breadcrumb className="mb-4">
                        <BreadcrumbList>
                            {getBreadcrumb(APP_ROUTES, "").map((node) => node)}
                        </BreadcrumbList>
                    </Breadcrumb>
                    {children}
                </div>
            </main>
        </div>
    )
}
