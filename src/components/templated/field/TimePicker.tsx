import React, { useCallback, useState } from "react";
import { Button, DatePicker, DatePickerView, Picker, PickerView, Popover } from "antd-mobile";
import styled from "@emotion/styled";
import Flex from "@/components/Flex";
import { CalendarOutline } from "antd-mobile-icons";
import { PickerDate } from "antd-mobile/es/components/date-picker/util";
import dayjs from "dayjs";

type TTimePickerProps = { value?: any; onChange?: (v: any) => void };

const TimePicker = ({ value, onChange }: TTimePickerProps) => {
  return <DatePicker>{(v, actions) => <Button type="button">{String(v)}</Button>}</DatePicker>;
};

export const TimePicker2 = ({ value, onChange }: TTimePickerProps) => {
  const [internalValue, setInternalValue] = useState<PickerDate>();
  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
      case "hour":
        return data;
      case "minute":
        return data;
      case "second":
        return data;
      default:
        return false;
    }
  }, []);
  return (
    <Popover
      trigger="click"
      placement="top-end"
      style={{ "--arrow-size": "0px" }}
      content={
        <StyledContent vertical>
          <DatePickerView
            value={internalValue}
            onChange={(v) => {
              setInternalValue(v);
            }}
            mouseWheel
            renderLabel={labelRenderer}
            precision="minute"
          ></DatePickerView>

          <Flex wrap="nowrap" gap={8} style={{marginBottom: 4}}>
            <Button style={{ flexShrink: 0, fontSize: 14 }}>Hủy</Button>
            <Button
              color="primary"
              style={{ flex: "1 1 auto", minWidth: 0, padding: "2px 6px" }}
            >
              <Flex justify="space-between" align="center" gap={2}>
                <span style={{ fontSize: 14 }}>Chọn:</span>
                <span style={{ fontSize: 15, fontWeight: 500 }}>
                  {dayjs(internalValue).format("DD/MM/YY HH:mm")}
                </span>
              </Flex>
            </Button>
          </Flex>
        </StyledContent>
      }
    >
      <StyledBtn>
        <Flex align="center" gap={8}>
          <span>23:59</span>
          <CalendarOutline fontSize={16} style={{ margin: "-2px 0 0" }} />
        </Flex>
      </StyledBtn>
    </Popover>
  );
};
const StyledBtn = styled(Button)`
  padding: 4px 8px;
`;

const StyledContent = styled(Flex)`
  width: 220px;
  height: 160px;
  & .adm-picker-view-column:nth-of-type(1),
  .adm-picker-view-column:nth-of-type(2),
  .adm-picker-view-column:nth-of-type(3) {
    display: none;
  }
`;

export default TimePicker;
