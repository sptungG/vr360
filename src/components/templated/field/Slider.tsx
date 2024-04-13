import React from "react";
import { Slider as AntdSlider, SliderSingleProps } from "antd";
import styled from "@emotion/styled";

type TSliderProps = SliderSingleProps & {};

const Slider = (props: TSliderProps) => {
  return <AntdSlider {...props} />;
};

export const TemperatureSlider = ({ value, max, min, tooltip, ...props }: TSliderProps) => {
  return (
    <StyledSlider01
      styles={{
        rail: {
          background: "linear-gradient(to right,#91caff 40%,#ffc53d, #ff7a45)",
        },
        tracks: {
          background: "transparent",
        },
        track: {
          background: "transparent",
        },
        handle: { zIndex: 10 },
      }}
      value={value}
      min={min}
      max={max}
      marks={{
        ...(min ? { [String(min)]: `${min}°C` } : {}),
        ...(value ? { [String(value)]: `${value}°C` } : {}),
        ...(max ? { [String(max)]: `${max}°C` } : {}),
      }}
      tooltip={{
        formatter: (v) => `${v}°C`,
        ...tooltip,
      }}
      {...props}
    />
  );
};
const StyledSlider01 = styled(AntdSlider)`
  margin-bottom: 24px !important;
  & .ant-slider-mark-text {
    backdrop-filter: blur(2px);
    padding: 0 4px 2px;
    color: ${({ theme }) => theme.colorPrimary};
    z-index: 1;
  }
  & .ant-slider-mark-text:first-of-type {
    transform: translateX(-25%) !important;
    font-size: 12px;
    padding: 0;
    color: currentColor;
    z-index: 0;
  }
  & .ant-slider-mark-text:last-of-type {
    transform: translateX(-80%) !important;
    font-size: 12px;
    padding: 0;
    color: currentColor;
    z-index: 0;
  }
`;

export const FanSlider = ({ value, max, min, tooltip, ...props }: TSliderProps) => {
  const mappedMark = Array(max || 0)
    .fill(null)
    .map((_, i) => i + 1)
    .reduce((prev, curr) => ({ ...prev, [String(curr)]: `${curr}` }), {});
  return (
    <StyledSlider02
      styles={{
        handle: { zIndex: 10 },
      }}
      value={value}
      min={min}
      max={max}
      marks={mappedMark}
      tooltip={{
        formatter: (v) => `${v}`,
        ...tooltip,
      }}
      {...props}
    />
  );
};
const StyledSlider02 = styled(AntdSlider)`
  margin-bottom: 24px !important;
  & .ant-slider-mark-text {
    backdrop-filter: blur(2px);
    padding: 2px 4px 2px;
    font-size: 12px;
  }
  & .ant-slider-mark-text:first-of-type {
    transform: translateX(-10%) !important;
    font-size: 12px;
    padding: 2px 0;
    color: currentColor;
  }
  & .ant-slider-mark-text:last-of-type {
    transform: translateX(-60%) !important;
    font-size: 12px;
    padding: 2px 0;
    color: currentColor;
  }
`;

export default Slider;
