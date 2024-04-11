import styled from "@emotion/styled";
import { Avatar, Badge, Flex, Form, Popover, Radio, Switch, TimePicker } from "antd";
import React, { useState } from "react";
import { SwitchOnOff } from "../field/Switch";
import Image from "next/image";
import { NImage } from "@/components/Image";
import { create } from "zustand";
import Tooltip from "@/components/Tooltip";
import { BtnHotspot } from "./BtnControl";
import { Light01Svg } from "@/components/icons";

type TState = {
  config: any;
  setConfig: (s: any) => void;
};

const useControlState = create<TState>()((set) => ({
  config: { color: "#fff1b8", autoOnOff: true, offTime: undefined, open: true },
  setConfig: (newState) => set({ config: newState }),
}));

type TControlLightProps = {};
const ControlLight = ({}: TControlLightProps) => {
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
          console.log("ControlLight ~ formData:", formData);
          setConfig(formData);
        }}
      >
        <Form.Item
          name="color"
          label="Chế độ màu"
          labelCol={{ flex: "auto" }}
          style={{ marginBottom: 8 }}
        >
          <StyledRadioLightModes>
            {[
              { value: "#fff", label: "Mát", imageUrl: "/lights/light01.jpg" },
              { value: "#fff1b8", label: "Trung tính", imageUrl: "/lights/light02.jpg" },
              { value: "#ffe58f", label: "Ấm", imageUrl: "/lights/light03.jpg" },
            ].map((item, index) => (
              <Radio.Button
                key={item.value + item.label}
                value={item.value}
                style={{ position: "relative", height: 50, minWidth: 60 }}
              >
                {/* <span style={{ zIndex: 2 }}>{item.label}</span> */}
                <NImage src={item.imageUrl} alt="" fill />
              </Radio.Button>
            ))}
          </StyledRadioLightModes>
        </Form.Item>

        <Form.Item name="autoOnOff" label="Tự động mở/tắt đèn khi vào/ra phòng">
          <Switch size="default"></Switch>
        </Form.Item>

        <Form.Item name="offTime" label="Cài đặt giờ ngủ" tooltip="Hẹn giờ tắt đèn">
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

const StyledRadioLightModes = styled(Radio.Group)``;

export const BtnHotpotLightTop = ({ onClick, onTooltipOpen }: any) => {
  const { config } = useControlState((s) => s);
  return (
    <Tooltip title={"Đèn trần"} afterOpenChange={onTooltipOpen}>
      <StyledWrapper key={String(config)}>
        <BtnHotspot
          onClick={onClick}
          icon={<Light01Svg fill="currentColor" style={{ width: 20, margin: "0 0 -2px" }} />}
        />
        <Flex className="config-wrapper">{!config.open && <span>OFF</span>}</Flex>
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

export const useControlStateLight = useControlState;
export default ControlLight;
