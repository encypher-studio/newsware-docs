import { ServiceContext } from "@/lib/context/service"
import { ColumnDef } from "@tanstack/react-table"
import { SourceDetails } from "newsware"
import { useContext, useEffect, useState } from "react"
import { DataTable } from "../category-codes/data-table"
import Section from "../section/section"

export const sourceColumns: ColumnDef<SourceDetails>[] = [
    {
        accessorKey: "name",
        header: "Name",
        accessorFn: (row: SourceDetails) => row.name.length > 0 ? row.name : row.code.charAt(0).toUpperCase() + row.code.split("_").join(" ").slice(1),
    },
    {
        accessorKey: "code",
        header: "Code",
        accessorFn: (row: SourceDetails) => row.code,
    },
    {
        accessorKey: "description",
        header: "Description",
    }
]

export default function Sources() {
    const [sources, setSources] = useState<SourceDetails[]>([])
    const { api } = useContext(ServiceContext)

    useEffect(() => {
        api.getSources().then(setSources)
    }, [api])

    return (
        <Section title="Sources" description="Newsware aggregates news from these sources.">
            <DataTable columns={sourceColumns} data={sources} />
        </Section>
    )
}
