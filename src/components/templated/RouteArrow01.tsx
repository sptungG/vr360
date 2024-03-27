import styled from "@emotion/styled";
import { Button, Flex, theme } from "antd";

type TRouteArrow01Props = {
  label?: string;
  toSceneId?: number;
  currentScene?: any;
  style?: React.CSSProperties;
  onClick?: (toSceneId?: number) => void;
  onMouseOver?: (toSceneId?: number) => void;
  onMouseOut?: (toSceneId?: number) => void;
};

const RouteArrow01 = ({
  label,
  toSceneId,
  currentScene,
  style,
  onClick,
  onMouseOver,
  onMouseOut,
}: TRouteArrow01Props) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <StyledWrapper type="default" style={style} onClick={() => onClick?.(toSceneId)}>
      <picture>
        <img src="/arrow3.png" alt="" width={90} />
      </picture>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Button)`
  padding: 0;
  background-color: transparent !important;
  border: none !important;
  &:hover {
  }
`;

export default RouteArrow01;
