import { TableSelectSvg } from "@/components/icons";
import styled from "@emotion/styled";
import React from "react";

type TPanelBookingTableProps = {};

const PanelBookingTable = ({}: TPanelBookingTableProps) => {
  return (
    <StyledWrapper>
      <TableSelectSvg style={{ width: 100, color: "#AD172B" }} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 500px;
`;

export default PanelBookingTable;
