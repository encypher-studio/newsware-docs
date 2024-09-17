import { Code, Section } from "@newsware/ui";

export const Installation = () => {
  return (
    <>
      <Section title="Installation">
        <div className="grid gap-2">
          <p>Get started by installing the Newsware client</p>
          <Code language="bash">npm install newsware</Code>
        </div>
      </Section>
      <Section title="Compatibility">
        <p>The client is compatible for browser and Node applications</p>
      </Section>
    </>
  );
};
