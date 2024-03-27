import { keyframes } from "@emotion/react";

export const AnimatePulse = (color1 = "#2A9476") => keyframes`
  0% {
    box-shadow: 0 0 0 0 ${color1};
  }

  100% {
    box-shadow: 0 0 0 14px #69ffa800;
  }
`;

export const AnimatePulse2 = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.33;
  }
`;
