import { Popover as AntdPopover, PopoverProps } from "antd";
import { useId } from "react";

type TPopoverProps = PopoverProps & {
  isPopupContainer?: boolean;
};

const Popover = ({ children, isPopupContainer, ...props }: TPopoverProps) => {
  const uid = useId();
  return (
    <div id={uid}>
      <AntdPopover
        key={uid + "AntdPopover"}
        arrow={{ pointAtCenter: true }}
        getPopupContainer={isPopupContainer ? (n) => document.getElementById(uid)! : undefined}
        {...props}
      >
        {children}
      </AntdPopover>
    </div>
  );
};

export default Popover;
