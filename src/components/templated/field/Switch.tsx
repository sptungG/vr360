import React from "react";
import { Switch as AntdSwitch, SwitchProps } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

type TSwitchProps = SwitchProps & {};

const Switch = (props: TSwitchProps) => {
  return <AntdSwitch {...props} />;
};

export const SwitchIcons = (props: TSwitchProps) => {
  return (
    <AntdSwitch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      {...props}
    />
  );
};

export const SwitchOnOff = (props: TSwitchProps) => {
  return <AntdSwitch checkedChildren="ON" unCheckedChildren="OFF" {...props} />;
};

export default Switch;
