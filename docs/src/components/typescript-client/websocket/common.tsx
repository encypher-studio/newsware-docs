import { DataTable } from "@/components/category-codes/data-table"
import { ColumnDef } from "@tanstack/react-table"

interface ActionColumn {
    name: string
    description: string
}

const actionColumn: ColumnDef<ActionColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
]

const actions: ActionColumn[] = [
    {
        name: "any",
        description: "Will match if any of the passed values are found."
    },
    {
        name: "all",
        description: "Will match only if all of the passed values are found."
    },
    {
        name: "exclude",
        description: "Won't match if any of the passed values are found."
    },
]

export const actionTable = () => {
    return (
        <DataTable
            columns={actionColumn}
            data={actions}
        />
    )
}