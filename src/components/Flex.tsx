import styled from "@emotion/styled";
import React from "react";

type TFlexProps = {
  vertical?: boolean;
  wrap?: React.CSSProperties["flexWrap"];
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  flex?: React.CSSProperties["flex"];
  gap?: React.CSSProperties["gap"];
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Flex = ({
  children,
  align,
  flex,
  gap,
  justify,
  style,
  vertical,
  wrap,
  className,
}: TFlexProps) => {
  return (
    <StyledWrapper
      className={className}
      style={{
        flex,
        flexWrap: wrap,
        flexDirection: vertical ? "column" : "row",
        justifyContent: justify,
        alignItems: align,
        gap,
        ...style,
      }}
    >
      {children}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
`;

export default Flex;
