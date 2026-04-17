import { useServiceContext } from "@/lib/context/service"
import { Code, ColumnDef, DataTable, Section } from "@newsware/ui"
import { RestHelper } from "newsware"
import { useEffect, useState } from "react"

interface Topic {
  id: number
  code: string
  description: string
  filter: string
}

const topicColumns: ColumnDef<Topic>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "filter",
    header: "Filter",
    cell: ({ row }) => <Code>{row.original.filter}</Code>,
  },
]

export const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([])
  const { environment } = useServiceContext()

  useEffect(() => {
    new RestHelper(environment.apiEndpointDescription)
      .get("/topics")
      .then((res) => setTopics((res as { data: Topic[] }).data))
  }, [environment])

  return (
    <Section
      title="Topics"
      description="Topics are named, reusable filters maintained by the Newsware team. Use them in the query language with the t/ prefix to quickly target a predefined set of news."
    >
      <div className="grid gap-4">
        <div>
          For example, to filter news matching the <Code>dj_sec</Code> topic:
        </div>
        <Code>t/dj_sec</Code>
        <div>Topics can be combined with other filters using conditionals:</div>
        <Code>t/dj_sec & "earnings"</Code>
        <DataTable columns={topicColumns} data={topics} />
      </div>
    </Section>
  )
}
