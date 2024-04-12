import { useTheme } from "@emotion/react";
import { Popover, PopoverProps } from "antd-mobile";
import React from "react";

type TTooltipProps = PopoverProps & {
  title?: React.ReactNode;
};

const Tooltip = ({ children, title, content, ...props }: TTooltipProps) => {
  const { generatedColors } = useTheme();

  return (
    <Popover
      placement="left"
      mode="light"
      content={
        <>
          {title}
          {content}
        </>
      }
      {...props}
    >
      {children}
    </Popover>
  );
};

export default Tooltip;
