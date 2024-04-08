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
    <StyledWrapper icon={icon} style={style} {...props}>
      {children}
    </StyledWrapper>
  );
};

const StyledWrapper = styled(AntdAvatar)`
  object-fit: cover;
  & > img {
    object-fit: inherit;
  }
`;

type TAvatarGroupProps = GroupProps & { children?: React.ReactNode };
export const AvatarGroup = ({ children, maxStyle, ...props }: TAvatarGroupProps) => {
  return (
    <AntdAvatar.Group size={28} maxStyle={{ fontSize: 12, ...maxStyle }} {...props}>
      {children}
    </AntdAvatar.Group>
  );
};

export default Avatar;
