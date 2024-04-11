import styled from "@emotion/styled";
import Link from "next/link";

export const StyledMarker01 = styled(Link)`
  position: relative;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  & img.thumbnail {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10px;
    border-radius: 100rem;
  }
`;

export const StyledVideo01 = styled.div`
  border: 2px solid #000;
  height: fit-content;
  & video {
    height: 100%;
    object-fit: contain;
  }
`;
