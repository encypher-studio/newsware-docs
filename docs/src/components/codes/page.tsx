import { useServiceContext } from "@/lib/context/service";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  DataTable,
  Section,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@newsware/ui";
import { Api, Code, CodeType } from "newsware";
import { useEffect, useState } from "react";
import { groupCodeColumns, sourceCodeColumns } from "./columns";

export const Codes = () => {
  const [sources, setSources] = useState<
    {
      source: string;
      name: string;
      [CodeType.CATEGORY]?: Code[];
      [CodeType.REGION]?: Code[];
      [CodeType.INDUSTRY]?: Code[];
      [CodeType.GROUP]?: Code[];
    }[]
  >([]);
  const { environment } = useServiceContext();
  const [selectedSource, setSelectedSource] = useState<string>("group");
  const [selectedCodeType, setSelectedCodeType] = useState<CodeType | "">("");

  useEffect(() => {
    Api.getSources(environment.apiEndpointDescription).then(async (sources) => {
      const sourcesNew = [
        {
          source: "group",
          name: "Curated by Newsware",
        },
      ];
      for (const source of sources) {
        sourcesNew.push({
          source: source.code,
          name: source.name === "" ? source.code : source.name,
        });
      }
      setSources(sourcesNew);
    });

    ensureCodes("group", CodeType.GROUP);
  }, [environment]);

  useEffect(() => {
    console.log(selectedSource, selectedCodeType);
    if (selectedSource !== "group" && selectedCodeType !== "") {
      ensureCodes(selectedSource, selectedCodeType);
    }
  }, [selectedSource, selectedCodeType]);

  const ensureCodes = async (source: string, typ: CodeType) => {
    let shouldFetch =
      sources.find((s) => s.source === source)?.[typ] === undefined;

    if (shouldFetch) {
      const codes = await Api.getCodes(
        source === "group" ? "" : source,
        typ,
        environment.apiEndpointDescription
      );
      setSources((prev) => {
        const newSources = prev.map((s) => {
          if (s.source === source) {
            switch (typ) {
              case CodeType.CATEGORY:
                return { ...s, [CodeType.CATEGORY]: codes };
              case CodeType.REGION:
                return { ...s, [CodeType.REGION]: codes };
              case CodeType.INDUSTRY:
                return { ...s, [CodeType.INDUSTRY]: codes };
              case CodeType.GROUP:
                return { ...s, [CodeType.GROUP]: codes };
            }
          }
          return s;
        });
        console.log(newSources);
        return newSources;
      });
    }
  };

  return (
    <Section
      title="Codes"
      description="Used to organize news. They can be used to filter results by category, region and industry."
    >
      <Select value={selectedSource} onValueChange={setSelectedSource}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a source" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sources</SelectLabel>
            {sources.map((source) => (
              <SelectItem key={source.source} value={source.source}>
                {source.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedSource === "group" && (
        <div>
          <div className="pb-5">
            Curated by the Newsware team for easy querying. They group together
            codes from multiple sources.
          </div>
          <DataTable
            columns={groupCodeColumns}
            data={
              sources.find((s) => s.source === "group")?.[CodeType.GROUP] ?? []
            }
          />
        </div>
      )}
      {selectedSource !== "group" &&
        sources.find((s) => s.source === selectedSource) && (
          <Accordion
            type="single"
            collapsible
            onValueChange={(v) => setSelectedCodeType(v as CodeType)}
            value={selectedCodeType}
          >
            {[CodeType.CATEGORY, CodeType.INDUSTRY, CodeType.REGION].map(
              (codeType) => (
                <AccordionItem key={codeType} value={codeType}>
                  <AccordionTrigger className="capitalize">
                    {codeType}
                  </AccordionTrigger>
                  <AccordionContent>
                    {sources.find((s) => s.source === selectedSource)?.[
                      codeType
                    ] === undefined ? (
                      <div className="grid gap-2">
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                      </div>
                    ) : (
                      <DataTable
                        columns={sourceCodeColumns}
                        data={
                          sources.find((s) => s.source === selectedSource)?.[
                            codeType
                          ] ?? []
                        }
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        )}
    </Section>
  );
};

const SkeletonItem = () => (
  <div className="grid grid-cols-[1fr_1fr_4fr] gap-2">
    <Skeleton className="h-[15px] rounded-full" />
    <Skeleton className="h-[15px] rounded-full" />
    <Skeleton className="h-[15px] rounded-full" />
  </div>
);
