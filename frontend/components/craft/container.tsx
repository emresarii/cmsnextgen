import { useNode } from "@craftjs/core";
import { Container, ContainerProps } from "@mantine/core";
import React, { FunctionComponent } from "react";


const CraftContainer: FunctionComponent<ContainerProps> = ({
  children,
  ...props
}: ContainerProps) => {
  const { connectors: {connect, drag} } = useNode();
  return (
      <Container ref={ref => connect(drag(ref))}{...props}>{children} </Container>

  );
};

export default CraftContainer;
