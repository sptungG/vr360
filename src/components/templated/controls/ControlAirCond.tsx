import Flex from "@/components/Flex";
import Tooltip from "@/components/Tooltip";
import styled from "@emotion/styled";
import { Form, Selector } from "antd-mobile";
import { AirVentIcon, DropletIcon, FanIcon, SnowflakeIcon, SunIcon } from "lucide-react";
import { create } from "zustand";
import { FanSlider, TemperatureSlider } from "../field/Slider";
import { SwitchOnOff } from "../field/Switch";
import TimePicker from "../field/TimePicker";
import { BtnHotspot } from "./BtnControl";

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
        initialValues={config}
        onValuesChange={(_, formData) => {
          setConfig(formData);
        }}
      >
        <Form.Item name="mode" label="Chế độ">
          <StyledRadioGroup
            options={[
              { value: 1, label: "Auto" },
              { value: 2, label: <SnowflakeIcon size={16} /> },
              { value: 3, label: <DropletIcon size={16} /> },
              { value: 4, label: <FanIcon size={16} /> },
              { value: 5, label: <SunIcon size={17} style={{ marginBottom: -3 }} /> },
            ]}
          />
        </Form.Item>

        <Form.Item name="temperature" label="Nhiệt độ" style={{ marginBottom: 8 }}>
          <TemperatureSlider max={30} min={16} />
        </Form.Item>

        <Form.Item name="fanSpeed" label="Quạt gió" style={{ marginBottom: 8 }}>
          <FanSlider max={6} min={1} />
        </Form.Item>

        <Form.Item name="offTime" label="Hẹn giờ tắt">
          <TimePicker />
        </Form.Item>

        <Form.Item name="open" label="Bật/Tắt" style={{ marginBottom: 0 }}>
          <SwitchOnOff />
        </Form.Item>
      </Form>
    </Flex>
  );
};

const StyledRadioGroup = styled(Selector)`
  & .ant-radio-button-wrapper {
    span:nth-of-type(2) svg {
      margin-bottom: -2.5px;
    }
  }
`;

export const BtnHotpotAirCond = ({ onClick, onTooltipOpen }: any) => {
  const { config } = useControlState((s) => s);
  return (
    <Tooltip content={"Điều hòa không khí"} onVisibleChange={onTooltipOpen}>
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
              <span>{config?.temperature}</span>
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
