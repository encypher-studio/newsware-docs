import { Section } from "@newsware/ui"
import {QueryLanguageTutorial} from "@/components/query-language/QueryLanguageTutorial.tsx";


export const QueryLanguage = () => {
  return (
    <Section
      title="Query Language"
      description="An easier alternative to filter query news. You can use literal and metadata filters, and join them using conditionals."
    >
      <QueryLanguageTutorial />
    </Section>
  );
};
