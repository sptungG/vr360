import { NOT_FOUND_IMG } from "@/common/constant";
import styled from "@emotion/styled";
import { Image as AntdImage, ImageProps, Skeleton } from "antd-mobile";
import { default as NextjsImage, ImageProps as NextjsImageProps } from "next/image";
import queryString from "query-string";

export type TImageProps = ImageProps;

export function NImage(props: NextjsImageProps) {
  return <NextjsImage sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw" {...props} />;
}

const Image = ({
  fallback = NOT_FOUND_IMG,
  src,
  /**
   * Điền tên item để có thể Fallback Ảnh theo tên
   */
  alt = "",
  ...props
}: ImageProps) => {
  return (
    <AntdImage
      src={src}
      placeholder={
        <Skeleton
          animated
          style={{ width: props.width || "100%", height: props.height || "100%" }}
        />
      }
      fallback={
        !!alt
          ? `https://ui-avatars.com/api/?${queryString.stringify({
              name: alt,
              // background: "acc981",
              color: "fff",
            })}`
          : fallback
      }
      {...props}
    />
  );
};
const ImageStyled = styled.picture`
  position: relative;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Image;
