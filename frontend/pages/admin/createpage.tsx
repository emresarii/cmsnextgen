import { Editor, Frame, Element } from "@craftjs/core";
import { Toolbox } from "../../components/craft/toolbox";
import CraftContainer from "../../components/craft/container";
import Button from "../../components/craft/button";
import CraftButton from "../../components/craft/button";
import { Container } from "@mantine/core";
import CraftText from "../../components/craft/text";
export default function createPage() {
  return (
    <Editor resolver={{ CraftContainer, Button, CraftText }}>
      <Toolbox />
      <div style={{ height: "100vh", width: "100%" }}>
        <Frame>
          <Element
            canvas
            is={CraftContainer}
            style={{ backgroundColor: "red", padding: "5rem", position: 'relative' }}
          ></Element>
        </Frame>
      </div>
    </Editor>
  );
}
