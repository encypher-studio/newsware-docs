import Code from "@/components/code/code";
import Section from "@/components/section/section";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Installation() {
    return (
        <>
            <Section title="Installation">
                <p>Get started by installing the Newsware client</p>
                <Code language="" style={atomOneDark}>
                    npm install newsware
                </Code>
            </Section>
            <Section title="Compatibility">
                <p>The client is compatible for browser and Node applications</p>
            </Section>
        </>
    )
}
