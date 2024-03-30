import { Drawer as AntdDrawer, DrawerProps } from "antd";

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
  return (
    <AntdDrawer
      placement="bottom"
      rootStyle={{}}
      maskClosable={false}
      rootClassName={className}
      push={false}
      styles={{
        wrapper: {
          width,
          height: "fit-content",
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

export default DrawerBottom;
