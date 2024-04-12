import Flex from "@/components/Flex";
import { NImage } from "@/components/Image";
import Tooltip from "@/components/Tooltip";
import { Light01Svg } from "@/components/icons";
import styled from "@emotion/styled";
import { Form, Selector } from "antd-mobile";
import { create } from "zustand";
import Switch, { SwitchOnOff } from "../field/Switch";
import TimePicker, { TimePicker2 } from "../field/TimePicker";
import { BtnHotspot } from "./BtnControl";
import { useEffect } from "react";

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
      <StyledForm
        key={String(config)}
        form={form}
        initialValues={config}
        layout="horizontal"
        onValuesChange={(_, formData) => {
          console.log("ControlLight ~ formData:", formData);
          setConfig(formData);
        }}
        style={{ "--prefix-width": "none" }}
      >
        <Form.Item
          name="color"
          label="Chế độ màu"
          childElementPosition="right"
          getValueFromEvent={(e) => e?.[0]}
        >
          <StyledSelectorLightModes
            multiple={false}
            showCheckMark
            style={{
              "--padding": "0px",
              "--border": "solid transparent 1px",
              "--checked-border": "solid var(--adm-color-primary) 1px",
            }}
            options={[
              { value: "#ffffff", label: "Mát", imageUrl: "/lights/light01.jpg" },
              { value: "#fff1b8", label: "Trung tính", imageUrl: "/lights/light02.jpg" },
              { value: "#ffe58f", label: "Ấm", imageUrl: "/lights/light03.jpg" },
            ].map((item, index) => ({
              label: (
                <div style={{ position: "relative", height: 50, minWidth: 60 }}>
                  {/* <span style={{ zIndex: 2 }}>{item.label}</span> */}
                  <NImage src={item.imageUrl} alt="" fill />
                </div>
              ),
              value: item.value,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="autoOnOff"
          label="Tự động mở/tắt đèn khi vào/ra phòng"
          childElementPosition="right"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="offTime"
          label="Cài đặt giờ ngủ"
          help="Hẹn giờ tắt đèn"
          childElementPosition="right"
        >
          <TimePicker2
          // variant="filled"
          // placeholder="HH:mm"
          // format={"HH:mm"}
          // minuteStep={5}
          // showNow={false}
          // inputReadOnly
          />
        </Form.Item>

        <Form.Item
          name="open"
          label="Bật/Tắt"
          style={{ marginBottom: 0 }}
          childElementPosition="right"
          valuePropName="checked"
        >
          <SwitchOnOff />
        </Form.Item>
      </StyledForm>
    </Flex>
  );
};

const StyledSelectorLightModes = styled(Selector)`
  & .adm-space-item {
    margin-right: 0;
  }
`;

const StyledForm = styled(Form)`
  & .adm-list-body {
    border: none !important;
  }
  & .adm-list-item {
    padding-left: 0;
    border: none !important;
  }
  & .adm-list-item-content {
    padding: 0;
  }
  & .adm-form-item-label {
    font-size: 14px;
  }
`;

export const BtnHotpotLightTop = ({ onClick, onTooltipOpen }: any) => {
  const { config } = useControlState((s) => s);
  return (
    <Tooltip content={"Đèn trần"} onVisibleChange={onTooltipOpen}>
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
