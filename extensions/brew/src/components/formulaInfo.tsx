import { Detail, useNavigation } from "@raycast/api";
import { FormulaActionPanel } from "./actionPanels";
import { Formula, brewIsInstalled, brewPrefix } from "../brew";

export function FormulaInfo(props: { formula: Formula; onAction: (result: boolean) => void }): JSX.Element {
  const { pop } = useNavigation();
  const { formula } = props;

  return (
    <Detail
      markdown={formatInfo(formula)}
      navigationTitle={`Formula: ${formula.name}`}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Link title="Homepage" text={formula.homepage} target={formula.homepage} />
          <Detail.Metadata.Label title="License" text={formula.license} />
        </Detail.Metadata>
      }
      actions={
        <FormulaActionPanel
          formula={formula}
          showDetails={false}
          onAction={(result) => {
            pop();
            props.onAction(result);
          }}
        />
      }
    />
  );
}

/// Private

function formatInfo(formula: Formula): string {
  return `
# ${formula.name}
${formula.desc}

${formatVersions(formula)}

${formatDependencies(formula)}

${formatConflicts(formula)}

${formatCaveats(formula)}
  `;
}

function formatVersions(formula: Formula): string {
  const versions = formula.versions;
  const status = [];
  if (versions.bottle) {
    status.push("bottled");
  }
  if (brewIsInstalled(formula)) {
    status.push("installed");
  }
  if (formula.installed.first()?.installed_as_dependency) {
    status.push("dependency");
  }
  let markdown = `
#### Versions
Stable: ${versions.stable} ${status ? `(${status.join(", ")})` : ""}

`;
  if (versions.head) {
    markdown += versions.head;
  }

  return markdown;
}

function formatDependencies(formula: Formula): string {
  let markdown = "";

  if (formula.dependencies.length > 0) {
    markdown += `
Required: ${formula.dependencies.join(", ")}
    `;
  }

  if (formula.build_dependencies.length > 0) {
    markdown += `
Build: ${formula.build_dependencies.join(", ")}
    `;
  }

  if (markdown) {
    return `#### Dependencies
${markdown}
    `;
  } else {
    return "";
  }
}

function formatConflicts(formula: Formula): string {
  if (!formula.conflicts_with || formula.conflicts_with.length == 0) {
    return "";
  }

  return `#### Conflicts With
 ${formula.conflicts_with.join(", ")}
  `;
}

function formatCaveats(formula: Formula): string {
  let caveats = "";

  if (formula.keg_only) {
    caveats += `
${formula.name} is keg-only, which means it is not symlinked into ${brewPrefix}.
    `;
  }

  if (formula.caveats) {
    caveats += `
${formula.caveats}
    `;
  }

  if (caveats) {
    return `#### Caveats
${caveats}
    `;
  } else {
    return "";
  }
}
