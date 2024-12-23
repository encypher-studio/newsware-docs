import { ColumnDef } from "@newsware/ui"
import { Code } from "newsware"

export const sourceCodeColumns: ColumnDef<Code>[] = [
  {
    accessorKey: "code",
    header: "Code",
    accessorFn: (row: Code) => row.source + "." + row.code,
  },
  {
    accessorKey: "description",
    header: "Description",
    accessorFn: (row: Code) =>
      row.description.length > 0
        ? row.description
        : row.code.charAt(0).toUpperCase() +
          row.code.split("_").join(" ").slice(1),
  },
];

export const groupCodeColumns: ColumnDef<Code>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "children",
    header: "Associated codes",
    accessorFn: (row: Code) =>
      row.children?.map((child) => child.source + "." + child.code).join("\n"),
  },
];
