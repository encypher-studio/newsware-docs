import { ServiceContext } from "@/lib/context/service"
import { CategoryCode } from "newsware"
import { useContext, useEffect, useState } from "react"
import Section from "../section/section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { groupCodeColumns, sourceCodeColumns } from "./columns"
import { DataTable } from "./data-table"

export default function CategoryCodes() {
    const [sources, setSources] = useState<{
        code: string
        categoryCodes: CategoryCode[]
    }[]>([])
    const [groups, setGroups] = useState<CategoryCode[]>([])
    const { api } = useContext(ServiceContext)

    useEffect(() => {
        api.getSources().then(async sources => {
            const sourcesNew = []
            for (const source of sources) {
                const categoryCodes = await api.getCategoryCodes(source.code)
                if (categoryCodes.length > 0) {
                    sourcesNew.push({ code: source.code, categoryCodes })
                }
            }
            setSources(sourcesNew)
        })

        api.getCategoryCodes("group").then(setGroups)
    }, [api])

    return (
        <Section title="Category codes" description="Used to categorize news. They can be used to filter results.">
            <Accordion type="single" defaultValue="group" collapsible>
                <AccordionItem value="group">
                    <AccordionTrigger>Curated codes</AccordionTrigger>
                    <AccordionContent>
                        <div className="pb-5">
                            Curated by the Newsware team for easy querying. They group together codes from multiple sources.
                        </div>
                        <DataTable columns={groupCodeColumns} data={groups} />
                    </AccordionContent>
                </AccordionItem>
                {
                    sources.map((source) => (
                        <AccordionItem key={source.code} value={source.code}>
                            <AccordionTrigger>{source.code}</AccordionTrigger>
                            <AccordionContent>
                                <DataTable columns={sourceCodeColumns} data={source.categoryCodes} />
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </Section>
    )
}
