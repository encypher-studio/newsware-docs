import { useServiceContext } from "@/lib/context/service";
import { ColumnDef, DataTable, Section } from "@newsware/ui";
import { Api, SourceDetails } from "newsware";
import { useEffect, useState } from "react";

const sourceColumns: ColumnDef<SourceDetails>[] = [
  {
    accessorKey: "name",
    header: "Name",
    accessorFn: (row: SourceDetails) =>
      row.name.length > 0
        ? row.name
        : row.code.charAt(0).toUpperCase() +
          row.code.split("_").join(" ").slice(1),
  },
  {
    accessorKey: "code",
    header: "Code",
    accessorFn: (row: SourceDetails) => row.code,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export const Sources = () => {
  const [sources, setSources] = useState<SourceDetails[]>([]);
  const { environment } = useServiceContext();

  useEffect(() => {
    Api.getSources(environment.apiEndpointDescription).then(setSources);
  }, [environment]);

  return (
    <Section
      title="Sources"
      description="Newsware aggregates news from these sources."
    >
      <DataTable columns={sourceColumns} data={sources} />
    </Section>
  );
};
