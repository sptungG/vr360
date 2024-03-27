import { Button, Popover } from "antd";
import React from "react";

export type TItemList01Props = {
  maxResultCount?: string;
  label?: string;
  onOpenChange?: (open?: boolean) => void;
};

const ItemList01 = ({ maxResultCount, label, onOpenChange }: TItemList01Props) => {
  return (
    <Popover
      placement="top"
      onOpenChange={onOpenChange}
      arrow={{ pointAtCenter: true }}
      content={maxResultCount}
    >
      <Button size="large" type="primary">
        {label}
      </Button>
    </Popover>
  );
};

export default ItemList01;
