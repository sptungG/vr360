import { Popup, PopupProps } from "antd-mobile";

type TPopupProps = PopupProps & {
  width?: number;
};

const PopupBottom = ({ children, width = 560, className, bodyStyle, ...props }: TPopupProps) => {
  return (
    <Popup
      position="bottom"
      mask={false}
      bodyStyle={{
        width: "100%",
        maxWidth: width,
        height: "fit-content",
        minHeight: 142,
        margin: "0 auto",
        ...bodyStyle,
      }}
      className={className}
      {...props}
    >
      {children}
    </Popup>
  );
};

export default PopupBottom;
