import { AnimatePulse } from "@/common/emotion-keyframes";
import styled from "@emotion/styled";
import { Button, ButtonProps } from "antd-mobile";
import React from "react";

type TBtnControlProps = Pick<
  ButtonProps,
  "color" | "fill" | "size" | "children" | "style" | "onClick" | "className" | "shape"
> & {
  icon?: React.ReactNode;
};

export const BtnControl = ({ children, icon, ...props }: TBtnControlProps) => {
  return (
    <StyledBtnControl fill="none" shape="rounded" type="button" {...props}>
      {icon}
      {children}
    </StyledBtnControl>
  );
};

const StyledBtnControl = styled(Button)`
  border-radius: 100rem;
`;

export type TBtnHotspotProps = Pick<
  ButtonProps,
  "color" | "fill" | "size" | "children" | "style" | "onClick" | "className" | "shape"
> & {
  icon?: React.ReactNode;
};

export const BtnHotspot = ({ children, icon, ...props }: TBtnHotspotProps) => {
  return (
    <StyledBtnHotspot type="button" shape="rounded" color="primary" {...props}>
      {icon}
      {children}
    </StyledBtnHotspot>
  );
};

const StyledBtnHotspot = styled(Button)`
  --color: currentColor;
  --animation: 2s ease-in-out infinite;
  border-radius: 100rem;
  animation: ${AnimatePulse("#fff")} var(--animation);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    border: solid 2px rgba(255, 255, 255, 0.2);
    border-radius: 100rem;
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border: solid 2px #fff;
    border-radius: 100rem;
  }
`;
