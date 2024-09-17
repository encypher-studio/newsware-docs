import { useServiceContext } from "@/lib/context/service";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  DataTable,
  Section,
} from "@newsware/ui";
import { Api, CategoryCode } from "newsware";
import { useEffect, useState } from "react";
import { groupCodeColumns, sourceCodeColumns } from "./columns";

export const CategoryCodes = () => {
  const [sources, setSources] = useState<
    {
      code: string;
      categoryCodes: CategoryCode[];
    }[]
  >([]);
  const [groups, setGroups] = useState<CategoryCode[]>([]);
  const { environment } = useServiceContext();

  useEffect(() => {
    Api.getSources(environment.apiEndpointDescription).then(async (sources) => {
      const sourcesNew = [];
      for (const source of sources) {
        let categoryCodes = await Api.getCategoryCodes(
          source.code,
          environment.apiEndpointDescription
        );
        categoryCodes = categoryCodes.filter(
          (categoryCode) => !categoryCode.code.includes(" ")
        );

        if (categoryCodes.length > 0) {
          sourcesNew.push({ code: source.code, categoryCodes });
        }
      }
      setSources(sourcesNew);
    });

    Api.getCategoryCodes("group", environment.apiEndpointDescription).then(
      setGroups
    );
  }, [environment]);

  return (
    <Section
      title="Category codes"
      description="Used to categorize news. They can be used to filter results."
    >
      <Accordion type="single" defaultValue="group" collapsible>
        <AccordionItem value="group">
          <AccordionTrigger>Curated codes</AccordionTrigger>
          <AccordionContent>
            <div className="pb-5">
              Curated by the Newsware team for easy querying. They group
              together codes from multiple sources.
            </div>
            <DataTable columns={groupCodeColumns} data={groups} />
          </AccordionContent>
        </AccordionItem>
        {sources.map((source) => (
          <AccordionItem key={source.code} value={source.code}>
            <AccordionTrigger>{source.code}</AccordionTrigger>
            <AccordionContent>
              <DataTable
                columns={sourceCodeColumns}
                data={source.categoryCodes}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};
