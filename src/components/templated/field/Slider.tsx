import React from "react";
import { Slider as AntdSlider, SliderProps } from "antd-mobile";
import styled from "@emotion/styled";

type TSliderProps = SliderProps & {};

const Slider = (props: TSliderProps) => {
  return <AntdSlider {...props} />;
};

export const TemperatureSlider = ({ value, max, min, ...props }: TSliderProps) => {
  return (
    <StyledSlider01
      // styles={{
      //   rail: {
      //     background: "linear-gradient(to right,#91caff 40%,#ffc53d, #ff7a45)",
      //   },
      //   tracks: {
      //     background: "transparent",
      //   },
      //   track: {
      //     background: "transparent",
      //   },
      //   handle: { zIndex: 10 },
      // }}
      style={{ "--fill-color": "" }}
      value={value}
      min={min}
      max={max}
      marks={{
        ...(min ? { [String(min)]: `${min}°C` } : {}),
        ...(value ? { [String(value)]: `${value}°C` } : {}),
        ...(max ? { [String(max)]: `${max}°C` } : {}),
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
  }
  & .ant-slider-mark-text:first-of-type {
    transform: translateX(-25%) !important;
    font-size: 12px;
    padding: 0;
    color: currentColor;
  }
  & .ant-slider-mark-text:last-of-type {
    transform: translateX(-80%) !important;
    font-size: 12px;
    padding: 0;
    color: currentColor;
  }
`;

export const FanSlider = ({ value, max, min, ...props }: TSliderProps) => {
  const mappedMark = Array(max || 0)
    .fill(null)
    .map((_, i) => i + 1)
    .reduce((prev, curr) => ({ ...prev, [String(curr)]: `${curr}` }), {});
  return (
    <StyledSlider02
      value={value}
      min={min}
      max={max}
      marks={mappedMark}
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
