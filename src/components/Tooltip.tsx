import { Tooltip as AntdTooltip, TooltipProps } from "antd";
import React from "react";
import { colorPrimary } from "./templated/ConfigProviders";
import { useTheme } from "@emotion/react";

type TTooltipProps = TooltipProps & {};

const Tooltip = ({ children, ...props }: TTooltipProps) => {
  const { generatedColors } = useTheme();
  return (
    <AntdTooltip color="#fff" overlayInnerStyle={{ color: generatedColors[8] }} {...props}>
      {children}
    </AntdTooltip>
  );
};

export default Tooltip;
