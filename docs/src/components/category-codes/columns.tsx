import { ColumnDef } from "@newsware/ui";
import { CategoryCode } from "newsware";

export const sourceCodeColumns: ColumnDef<CategoryCode>[] = [
  {
    accessorKey: "code",
    header: "Code",
    accessorFn: (row: CategoryCode) => row.source + "." + row.code,
  },
  {
    accessorKey: "description",
    header: "Description",
    accessorFn: (row: CategoryCode) =>
      row.description.length > 0
        ? row.description
        : row.code.charAt(0).toUpperCase() +
          row.code.split("_").join(" ").slice(1),
  },
];

export const groupCodeColumns: ColumnDef<CategoryCode>[] = [
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
    accessorFn: (row: CategoryCode) =>
      row.children?.map((child) => child.source + "." + child.code).join("\n"),
  },
];
