import { AnimatePulse } from "@/common/emotion-keyframes";
import styled from "@emotion/styled";
import { Button, ButtonProps } from "antd";
import React from "react";

type TBtnControlProps = Pick<
  ButtonProps,
  "type" | "children" | "icon" | "style" | "onClick" | "className" | "classNames"
> & {};

export const BtnControl = ({ children, ...props }: TBtnControlProps) => {
  return (
    <StyledBtnControl type="text" htmlType="button" {...props}>
      {children}
    </StyledBtnControl>
  );
};

const StyledBtnControl = styled(Button)`
  border-radius: 100rem;
`;

export type TBtnHotspotProps = Pick<
  ButtonProps,
  "type" | "children" | "icon" | "style" | "onClick" | "className" | "classNames"
> & {};

export const BtnHotspot = ({ children, ...props }: TBtnHotspotProps) => {
  return (
    <StyledBtnHotspot htmlType="button" icon={<></>} type="primary" {...props}>
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
