import { SyntaxHighlighterProps, Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Code(props: SyntaxHighlighterProps) {
    return (
        <div className="mt-6 w-full">
            <SyntaxHighlighter
                customStyle={{
                    width: "100%",
                }}
                codeTagProps={{
                    style: {
                        whiteSpace: "pre",
                    }
                }}
                language={props.language} style={atomOneDark}>
                {props.children}
            </SyntaxHighlighter>
        </div>
    )
}
