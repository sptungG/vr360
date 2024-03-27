import styled from "@emotion/styled";
import React from "react";

type TScrollBarProps = { className?: string; children?: React.ReactNode };

const ScrollBar = ({ className, children }: TScrollBarProps) => {
  return <StyledWrapper className={className}>{children}</StyledWrapper>;
};

const StyledWrapper = styled.div``;

export default ScrollBar;
