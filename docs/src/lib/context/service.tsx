import React, { PropsWithChildren } from "react"
import { Api } from "newsware"
import { Environment } from "../environment"

interface IServiceContext {
    api: Api
}

export const ServiceContext = React.createContext<IServiceContext>({
    api: new Api("", Environment.apiEndpointDescription)
})

export function ServiceProvider({ children }: PropsWithChildren) {
    const api = new Api("", Environment.apiEndpointDescription)

    return <ServiceContext.Provider value={{
        api
    }}>
        {children}
    </ServiceContext.Provider>
}