import { Drawer as AntdDrawer, DrawerProps } from "antd";
import { useMeasure } from "react-use";
import ScrollBar from "./templated/ScrollBar";
import styled from "@emotion/styled";

type TDrawerProps = DrawerProps & {};

const DrawerBottom = ({
  children,
  width = 560,
  height,
  className,
  styles = {},
  ...props
}: TDrawerProps) => {
  const { wrapper, ...restStyles } = styles;
  const [childRef, { width: childWidth, height: childHeight }] = useMeasure<HTMLDivElement>();
  return (
    <AntdDrawer
      placement="bottom"
      rootStyle={{}}
      maskClosable={false}
      rootClassName={className}
      push={false}
      panelRef={childRef}
      styles={{
        wrapper: {
          width,
          height: 'auto',
          minHeight: childHeight || 146,
          margin: "0 auto",
          ...wrapper,
        },
        ...restStyles,
      }}
      {...props}
    >
      {children}
    </AntdDrawer>
  );
};

const StyledWrapper = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default DrawerBottom;
