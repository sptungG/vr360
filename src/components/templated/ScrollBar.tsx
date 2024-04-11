import styled from "@emotion/styled";
import React from "react";

type TScrollBarProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const ScrollBar = ({ className, children, style }: TScrollBarProps) => {
  return (
    <StyledWrapper className={className} style={style}>
      {children}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ScrollBar;
