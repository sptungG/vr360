import { keyframes } from "@emotion/react";
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

const antStatusProcessing = keyframes`
  0% {
      transform: scale(0.8);
      opacity: 0.5;
  }
  100% {
      transform: scale(2.4);
      opacity: 0;
  }
`;

export const StatusProcessing = styled.div`
  --color: ${({ theme }) => theme.colorPrimary};
  --size: 8px;
  position: relative;
  display: inline-block;
  width: var(--size);
  height: var(--size);
  vertical-align: middle;
  border-radius: 50%;
  overflow: visible;
  color: var(--color);
  background-color: var(--color);
  &::after {
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    border-radius: 50%;
    animation-name: ${antStatusProcessing};
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    content: "";
  }
`;
