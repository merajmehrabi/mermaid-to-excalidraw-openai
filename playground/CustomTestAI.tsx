import { MermaidDiagram } from "./MermaidDiagram.tsx";
import type { ActiveTestCaseIndex, MermaidData } from "./index.tsx";

interface CustomTestAIProps {
  onChange: (
    definition: MermaidData["definition"],
    activeTestCaseIndex: ActiveTestCaseIndex
  ) => void;
  mermaidData: MermaidData;
  activeTestCaseIndex: ActiveTestCaseIndex;
}

const CustomTestAI = ({
  onChange,
  mermaidData,
  activeTestCaseIndex,
}: CustomTestAIProps) => {
  const isActive = activeTestCaseIndex === "custom-ai";
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);

          onChange(formData.get("mermaid-input")?.toString() || "", "custom-ai");
        }}
      >
        <textarea
          id="mermaid-input"
          rows={10}
          cols={50}
          name="mermaid-input"
          onChange={(e) => {
            if (!isActive) {
              return;
            }

            onChange(e.target.value, "custom-ai");
          }}
          style={{ marginTop: "1rem" }}
          placeholder="Input Mermaid Syntax"
        />
        <br />
        <button type="submit" id="render-excalidraw-btn">
          {"Render to XExcalidraw"}
        </button>
      </form>

      {isActive && (
        <>
          <MermaidDiagram
            definition={mermaidData.definition}
            id="custom-ai-diagram"
          />

          <details id="parsed-data-details">
            <summary>{"Parsed data from parseMermaid"}</summary>
            <pre id="custom-ai-parsed-data">
              {JSON.stringify(mermaidData.output, null, 2)}
            </pre>
            {mermaidData.error && <div id="error">{mermaidData.error}</div>}
          </details>
        </>
      )}
    </>
  );
};

export default CustomTestAI;
