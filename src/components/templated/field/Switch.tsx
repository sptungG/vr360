import React from "react";
import { Switch as AntdSwitch, SwitchProps } from "antd-mobile";
import { CheckOutline, CloseOutline } from "antd-mobile-icons";
import styled from "@emotion/styled";

type TSwitchProps = SwitchProps & {};

const Switch = ({ style, ...props }: TSwitchProps) => {
  return (
    <AntdSwitch style={{ "--height": "25px", "--border-width": "1.5px", ...style }} {...props} />
  );
};

export const SwitchIcons = (props: TSwitchProps) => {
  return <Switch checkedText={<CheckOutline />} uncheckedText={<CloseOutline />} {...props} />;
};

export const SwitchOnOff = (props: TSwitchProps) => {
  return <StyledSwitch checkedText="ON" uncheckedText="OFF" style={{ fontSize: 12 }} {...props} />;
};
const StyledSwitch = styled(Switch)`
  & .adm-switch-inner {
    font-size: 12px;
  }
`;

export default Switch;
