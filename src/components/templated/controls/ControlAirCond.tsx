import styled from "@emotion/styled";
import { Badge, Flex, Form, Popover, Radio, Switch, TimePicker } from "antd";
import { AirVentIcon, DropletIcon, FanIcon, SnowflakeIcon, SunIcon } from "lucide-react";
import React, { useState } from "react";
import { create } from "zustand";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { SwitchIcons, SwitchOnOff } from "../field/Switch";
import { FanSlider, TemperatureSlider } from "../field/Slider";
import { BtnHotspot } from "./BtnControl";
import Tooltip from "@/components/Tooltip";

type TState = {
  config: any;
  setConfig: (s: any) => void;
};

export const useControlState = create<TState>()((set) => ({
  config: { mode: 1, temperature: 23, fanSpeed: 2, open: true },
  setConfig: (newState) => set({ config: newState }),
}));

type TControlAirCondProps = {};
export const ControlAirCond = ({}: TControlAirCondProps) => {
  const [form] = Form.useForm();
  const { config, setConfig } = useControlState((s) => s);

  return (
    <Flex align="start">
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
        <Form.Item name="mode" label="Chế độ" labelCol={{ flex: "auto" }}>
          <StyledRadioGroup>
            {[
              { value: 1, label: "Auto" },
              { value: 2, label: <SnowflakeIcon size={16} /> },
              { value: 3, label: <DropletIcon size={16} /> },
              { value: 4, label: <FanIcon size={16} /> },
              { value: 5, label: <SunIcon size={17} style={{ marginBottom: -3 }} /> },
            ].map((item, index) => (
              <Radio.Button
                value={item.value}
                key={item.value + index}
                style={index == 0 ? { padding: "0 8px" } : {}}
              >
                {item.label}
              </Radio.Button>
            ))}
          </StyledRadioGroup>
        </Form.Item>

        <Form.Item
          name="temperature"
          label="Nhiệt độ"
          labelCol={{ flex: "none" }}
          wrapperCol={{ flex: "auto" }}
          style={{ marginBottom: 8 }}
        >
          <TemperatureSlider max={30} min={16} tooltip={{ open: false }} />
        </Form.Item>

        <Form.Item
          name="fanSpeed"
          label="Quạt gió"
          labelCol={{ flex: "none" }}
          wrapperCol={{ flex: "auto" }}
          style={{ marginBottom: 8 }}
        >
          <FanSlider max={6} min={1} tooltip={{ open: false }} />
        </Form.Item>

        <Form.Item name="offTime" label="Hẹn giờ tắt">
          <TimePicker
            variant="filled"
            placeholder="HH:mm"
            format={"HH:mm"}
            minuteStep={5}
            showNow={false}
          />
        </Form.Item>

        <Form.Item name="open" label="Bật/Tắt" style={{ marginBottom: 0 }}>
          <SwitchOnOff />
        </Form.Item>
      </Form>
    </Flex>
  );
};

const StyledRadioGroup = styled(Radio.Group)`
  & .ant-radio-button-wrapper {
    span:nth-of-type(2) svg {
      margin-bottom: -2.5px;
    }
  }
`;

export const BtnHotpotAirCond = ({ onClick, onTooltipOpen }: any) => {
  const { config } = useControlState((s) => s);
  return (
    <Tooltip title={"Điều hòa không khí"} onOpenChange={onTooltipOpen}>
      <StyledWrapper key={String(config)}>
        <BtnHotspot
          onClick={onClick}
          icon={<AirVentIcon strokeWidth={1.5} color="currentColor" size={16} />}
        />
        <Flex className="config-wrapper">
          {!config.open ? (
            <span>OFF</span>
          ) : (
            <Flex align="center" className="temperature-badge">
              <Badge count={config?.temperature} />
              <span>°C</span>
            </Flex>
          )}
        </Flex>
      </StyledWrapper>
    </Tooltip>
  );
};
const StyledWrapper = styled(Flex)`
  position: relative;
  & .config-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 2px 4px;
    transform: translateX(90%);
    border-radius: 8px;

    & .temperature-badge {
      color: #fff;
      & .ant-badge {
        margin: -2px 0 0 4px;
        color: inherit;
        .ant-badge-count {
          box-shadow: none;
          background-color: transparent;
          padding: 0;
          min-width: 10px;
          font-size: 16px;
          color: inherit;
        }
      }
    }
  }
`;

export default ControlAirCond;
