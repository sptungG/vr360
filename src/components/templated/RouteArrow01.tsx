import { styled } from "@/common/emotion-styled";
import { Button, Flex } from "antd";

type TRouteArrow01Props = {
  label?: string;
  toSceneId?: number;
  currentScene?: any;
  onClick?: (toSceneId: number) => void;
  style?: React.CSSProperties;
};

const RouteArrow01 = ({ label, toSceneId, onClick, currentScene, style }: TRouteArrow01Props) => {
  // const {
  //   token: { colorPrimary },
  // } = theme.useToken();
  return (
    <Flex vertical align="center" gap={4}>
      <Button
        type="default"
        onClick={() => {
          !!toSceneId && onClick?.(toSceneId);
        }}
        style={style}
      >
        {label}
      </Button>
      <picture>
        <img src="/arrow3.png" alt="" width={90} />
      </picture>
    </Flex>
  );
};

const StyledWrapper = styled(Flex)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export default RouteArrow01;
