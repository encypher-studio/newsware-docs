import { PropsWithChildren } from "react";
import Section from "../section/section";

export default function Docs({ children }: PropsWithChildren) {
    return (
        <>
            <Section title="Newsware Docs">
                <p>Documentation for Newsware API and clients.</p>
            </Section>
        </>
    )
}
