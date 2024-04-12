import styled from "@emotion/styled";
import { AvatarProps, Avatar as AntdAvatar } from "antd-mobile";
import React from "react";

type TAvatarProps = AvatarProps & {};

const Avatar = ({ style, ...props }: TAvatarProps) => {
  return <AntdAvatar style={style} {...props} />;
};

export default Avatar;
