import { Button, ButtonProps } from "@mantine/core";
import { useNode } from "@craftjs/core";

export default function CraftButton({ children, ...props }: ButtonProps) {
  const {
    connectors: { connect,drag },
  } = useNode();
  
  return <Button ref={ref => connect(drag(ref))} {...props}>{children}</Button>;
}
