import { Action, Icon } from "@raycast/api";
import React from "react";
import { ImageDetail } from "./image-detail";

export function RevealImageAction(props: {
  imageURL: string;
  size: string;
  autoRefresh?: boolean;
  setRefresh?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { imageURL, size } = props;
  const autoRefresh = typeof props.autoRefresh === "undefined" ? false : props.autoRefresh;
  const setRefresh =
    typeof props.setRefresh === "undefined"
      ? () => {
          return;
        }
      : props.setRefresh;

  return (
    <>
      <Action.Push
        icon={Icon.Maximize}
        shortcut={{ modifiers: ["cmd"], key: "y" }}
        title={"Preview Image"}
        target={<ImageDetail imageURL={imageURL} size={size} autoRefresh={autoRefresh} setRefresh={setRefresh} />}
      />
      <Action.OpenInBrowser shortcut={{ modifiers: ["cmd"], key: "o" }} url={imageURL} />
    </>
  );
}
