import { Tooltip as AntdTooltip, TooltipProps } from "antd";
import React from "react";
import { colorPrimary } from "./templated/ConfigProviders";
import { useTheme } from "@emotion/react";

type TTooltipProps = TooltipProps & {};

const Tooltip = ({ children, ...props }: TTooltipProps) => {
  const { generatedColors } = useTheme();

  return (
    <AntdTooltip
      mouseEnterDelay={0.01}
      mouseLeaveDelay={0.01}
      color="#fff"
      overlayInnerStyle={{ color: generatedColors[8] }}
      arrow={{ pointAtCenter: true }}
      placement="left"
      {...props}
    >
      {children}
    </AntdTooltip>
  );
};

export default Tooltip;
