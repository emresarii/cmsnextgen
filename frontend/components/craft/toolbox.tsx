import { Button, ColorInput, Container, Flex, Slider } from "@mantine/core";
import CraftButton from "./button";

import { Element, useEditor } from "@craftjs/core";
import CraftContainer from "./container";
import CraftText from "./text";
import { createElement } from "react";

export const Toolbox = () => {
  const {
    selected,
    actions,
    connectors: { create },
  } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return (
    <>
      <Container size={200}>
        <Flex direction={"column"}>
          <h1>Drag and drop the component</h1>

          <div
            ref={(ref) =>
              create(ref, <Element canvas is={CraftButton}></Element>)
            }
          >
            <Button>Button</Button>
          </div>

          <div
            ref={(ref) =>
              create(ref, <Element canvas is={CraftText}></Element>)
            }
          >
            <Button>Text</Button>
          </div>

          <div
            ref={(ref) =>
              create(
                ref,
                <Element
                  canvas
                  is={CraftContainer}
                  style={{ border: "1px solid black", padding: "1rem" }}
                ></Element>
              )
            }
          >
            <Button>Container</Button>
          </div>
        </Flex>
        {selected && (
          <div>
            {selected.settings && createElement(selected.settings)}

            {selected.isDeletable ? (
              <Button
                color="default"
                onClick={() => {
                  actions.delete(selected.id);
                }}
              >
                Delete
              </Button>
            ) : null}
          </div>
        )}
      </Container>
    </>
  );
};
