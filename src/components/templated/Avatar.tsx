import styled from "@emotion/styled";
import { AvatarProps, Avatar as AntdAvatar, theme } from "antd";
import type { GroupProps } from "antd/es/avatar";
import React from "react";

type TAvatarProps = AvatarProps & {};

const Avatar = ({ icon, children, style, ...props }: TAvatarProps) => {
  const {
    token: { colorPrimaryBorder, colorPrimaryBg },
  } = theme.useToken();
  return (
    <AntdAvatar
      icon={icon}
      style={{
        backgroundColor: colorPrimaryBorder,
        borderColor: colorPrimaryBg,
        ...style,
      }}
      {...props}
    >
      {children}
    </AntdAvatar>
  );
};

const StyledWrapper = styled(AntdAvatar)``;

type TAvatarGroupProps = GroupProps & { children?: React.ReactNode };
export const AvatarGroup = ({ children, maxStyle, ...props }: TAvatarGroupProps) => {
  return (
    <AntdAvatar.Group size={28} maxStyle={{ fontSize: 12, ...maxStyle }} {...props}>
      {children}
    </AntdAvatar.Group>
  );
};

export default Avatar;
