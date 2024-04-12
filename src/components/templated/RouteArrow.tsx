import styled from "@emotion/styled";
import Link, { LinkProps } from "next/link";
import Flex from "../Flex";
import { NImage } from "../Image";
import { MarkerSvg } from "../icons";

type TRouteArrow01Props = LinkProps & {
  styleImg?: React.CSSProperties;
};

export const RouteArrow01 = ({ href, onClick, styleImg, ...props }: TRouteArrow01Props) => {
  return (
    <Link href={href} onClick={onClick} prefetch {...props}>
      <NImage src="/arrow3.png" alt="" width={90} height={90} style={styleImg} />
    </Link>
  );
};

type TRouteMarker01Props = LinkProps & {
  styleImg?: React.CSSProperties;
  imageUrl: string;
};
export const RouteMarker01 = ({
  href,
  onClick,
  styleImg,
  imageUrl,
  ...props
}: TRouteMarker01Props) => {
  return (
    <StyledMarker01 href={href} onClick={onClick} prefetch {...props}>
      <Flex vertical>
        <NImage
          className="thumbnail"
          src={imageUrl}
          alt=""
          width={100}
          height={100}
          quality={10}
        ></NImage>
        <MarkerSvg style={{ width: 125 }} />
      </Flex>
    </StyledMarker01>
  );
};
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
