import { Section } from "@newsware/ui";
import { Link } from "react-router-dom";

export const Examples = () => {
  return (
    <>
      <Section title="Examples">
        <p>
          Examples for Node and Browser usage can be found in the repo. Make
          sure to configure your apikey in both examples before running.
        </p>
      </Section>

      <Section title="Browser example">
        <p className="pb-6">
          Uses React, subscribes to news and outputs them to a table in the
          browser:
        </p>
        <Link
          target="_blank"
          to="https://github.com/encypher-studio/newsware_typescript_client/tree/main/examples/browser"
          className="text-accent"
        >
          Github
        </Link>
      </Section>
      <Section title="Node example">
        <p className="pb-6">
          Uses Node to subscribe to API and outputs news to console:
        </p>
        <Link
          target="_blank"
          to="https://github.com/encypher-studio/newsware_typescript_client/tree/main/examples/node"
          className="text-accent"
        >
          Github
        </Link>
      </Section>
    </>
  );
};
