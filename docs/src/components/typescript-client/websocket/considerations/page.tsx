import { Section } from "@newsware/ui";

export const Considerations = () => {
  return (
    <>
      <Section title="Considerations">
        <ul className="ml-6 list-disc">
          <li>An api key is needed to interact with the Newsware API.</li>
          <li>The text queries are case insensitive.</li>
        </ul>
      </Section>
    </>
  );
};
