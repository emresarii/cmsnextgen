import { useNode } from "@craftjs/core";
import { ColorInput, Slider, TextProps } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { text } from "stream/consumers";

interface CraftTextType extends TextProps {
  text: string;
  fontSize: number;
}

const CraftText = ({ children, ...props }: CraftTextType) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    isActive,
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));
  const [editable, setEditable] = useState("");

  return (
    <div onClick={(e) => setEditable(true)} ref={(ref) => connect(drag(ref))}>
      <ContentEditable
        disabled={!editable}
        html={props.text ?? "lorem ipsum"}
        onChange={(e) =>
          setProp((props: { text: string }) => {
            const val = e.target.value.replace(/<\/?[^>]+(>|$)/g, "");
            props.text = val;
          })
        }
        tagName="p"
        style={{ fontSize: `${props.fontSize}px`, color: `${props.color}` }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    color
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    color: node.data.props.color
  }));

  return (
    <>
      <Slider
        mb= "1rem"
        onChange={(_: any, value: any) => {
          return setProp(
            (props: { fontSize: any }) => (props.fontSize = _)
          );
        }}
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" },
        ]}
      />
       <ColorInput placeholder="Pick color" label="Your favorite color" value={color} onChange={(value : any) => {
         setProp(
          (props: {color : any}) => (props.color=value)
         )
       }}/>
    </>
  );
};

CraftText.craft = {
  related: {
    settings: TextSettings,
  },
};

export default CraftText;
