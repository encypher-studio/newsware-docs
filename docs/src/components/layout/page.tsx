import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="container mx-auto py-10">
            {children}
        </div>
    )
}
