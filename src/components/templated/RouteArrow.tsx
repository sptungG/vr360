import styled from "@emotion/styled";
import { Button, Flex, theme } from "antd";
import Link, { LinkProps } from "next/link";

type TRouteArrow01Props = LinkProps & {
  styleImg?: React.CSSProperties;
};

export const RouteArrow01 = ({ href, onClick, styleImg, ...props }: TRouteArrow01Props) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Link href={href} onClick={onClick} prefetch {...props}>
      <picture>
        <img src="/arrow3.png" alt="" width={90} style={styleImg} />
      </picture>
    </Link>
  );
};
