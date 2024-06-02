import Section from "@/components/section/section";

export default function Considerations() {
    return (
        <>
            <Section title="Considerations">
                <ul className="mt-6 ml-6 list-disc">
                    <li>
                        An api key is needed to interact with the Newsware API.

                    </li>
                    <li>
                        The text queries are case insensitive.
                    </li>
                </ul>
            </Section>
        </>
    )
}
