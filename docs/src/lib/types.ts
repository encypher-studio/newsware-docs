import { ColumnDef } from "@newsware/ui"

export interface FieldDefinitionColumn {
    name: string
    definition: string
    required: boolean
}

export const fieldDefinitionColumn: ColumnDef<FieldDefinitionColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "definition",
        header: "Definition",
    },
    {
        accessorKey: "required",
        header: "Required",
        accessorFn: (row: FieldDefinitionColumn) => row.required ? '\u2705' : "",
    },
]