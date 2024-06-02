import { APP_ROUTES, RouteOption } from "@/lib/routes/routes";
import path from "path";
import { PropsWithChildren } from "react";
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
        <div className="px-6 items-start grid gap-6 lg:gap-10 grid-cols-[auto_1fr]">
            <Sidebar />
            <main className="py-6 overflow-hidden">
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
