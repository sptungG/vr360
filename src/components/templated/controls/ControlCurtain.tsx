import { Form, Popover, TimePicker } from "antd";
import React, { useState } from "react";
import { SwitchOnOff } from "../field/Switch";
import { create } from "zustand";

type TState = {
  config: any;
  setConfig: (s: any) => void;
};

export const useControlState = create<TState>()((set) => ({
  config: { open: false },
  setConfig: (newState) => set({ config: newState }),
}));

type TControlCurtainProps = {};

const ControlCurtain = ({}: TControlCurtainProps) => {
  const [form] = Form.useForm();
  const { config, setConfig } = useControlState((s) => s);
  return (
    <Form
      form={form}
      labelCol={{ flex: "auto" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: "none" }}
      initialValues={config}
      onValuesChange={(_, formData) => {
        setConfig(formData);
      }}
    >
      <Form.Item name="openTime" label="Cài đặt giờ mở" tooltip="Hẹn giờ tắt">
        <TimePicker
          variant="filled"
          placeholder="HH:mm"
          format={"HH:mm"}
          minuteStep={5}
          showNow={false}
          inputReadOnly
        />
      </Form.Item>

      <Form.Item name="open" label="Mở/Đóng Rèm" style={{ marginBottom: 0 }}>
        <SwitchOnOff />
      </Form.Item>
    </Form>
  );
};

export default ControlCurtain;
