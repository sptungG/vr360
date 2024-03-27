import useSceneState from "@/common/useSceneState";
import styled from "@emotion/styled";
import { Badge, Button, Divider, DrawerProps, Flex, Form, Tabs, Typography, theme } from "antd";
import {
  GalleryHorizontalIcon,
  HeartIcon,
  MessageCircleMoreIcon,
  PanelBottomOpenIcon,
  Rotate3DIcon,
  StoreIcon,
} from "lucide-react";
import { useId, useState } from "react";
import DrawerBottom from "../DrawerBottom";
import Tooltip from "../Tooltip";
import Avatar from "./Avatar";

type TControlBar01Props = DrawerProps & {};

const ControlBar01 = ({ children, ...props }: TControlBar01Props) => {
  const uid = useId();
  const [form] = Form.useForm();
  const {
    token: { colorBgBase, colorTextLabel, colorPrimary },
  } = theme.useToken();

  const { autoRotate, isViewing } = useSceneState((s) => s);
  const setAutoRotate = useSceneState((s) => s.setAutoRotate);

  const [selectedTab, setSelectedTab] = useState<string>(uid + 0);

  return (
    <StyleWrapper
      width={720}
      styles={{ mask: { display: "none" }, body: { padding: 12 } }}
      title={
        <>
          <Flex className="title-wrapper" align="center" gap={2}>
            <Flex align="center" gap={0}>
              <Avatar
                size={32}
                style={{
                  margin: "0 6px 0 0",
                  border: "none",
                  backgroundColor: "rgba(255,255,255,0.5)",
                }}
                icon={<StoreIcon color={colorBgBase} />}
              ></Avatar>
              <Flex vertical>
                <Typography.Title
                  level={2}
                  className="title"
                  style={{ margin: 0, color: colorBgBase, lineHeight: 1, fontSize: 15 }}
                >
                  Coffee Shop
                </Typography.Title>
                <Typography.Text type="secondary" style={{ fontSize: 10, color: colorBgBase }}>
                  2 giờ trước
                </Typography.Text>
              </Flex>

              <Divider type="vertical" style={{ margin: "0 6px", height: 22 }} />

              <Flex gap={8}>
                <Badge
                  count={2}
                  size="small"
                  offset={[-5, 5]}
                  style={{ backgroundColor: colorPrimary }}
                >
                  <StyleButton01
                    type="text"
                    size="small"
                    style={{ color: colorBgBase }}
                    icon={<HeartIcon size={21} />}
                  />
                </Badge>
                <Badge
                  count={2}
                  size="small"
                  offset={[-5, 5]}
                  style={{ backgroundColor: colorPrimary }}
                >
                  <StyleButton01
                    type="text"
                    size="small"
                    style={{ color: colorBgBase }}
                    icon={<MessageCircleMoreIcon size={21} />}
                  />
                </Badge>
              </Flex>

              {/* <Flex align="baseline" gap={2}>
                <AvatarGroup size={24} maxCount={1}>
                  <Avatar>You</Avatar>
                  <Avatar icon={<UserRoundIcon size={13} />}></Avatar>
                  <Avatar icon={<UserRoundIcon size={13} />}></Avatar>
                  <Avatar icon={<UserRoundIcon size={13} />}></Avatar>
                </AvatarGroup>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  đang tham quan
                </Typography.Text>
              </Flex> */}
            </Flex>

            {/* <Divider type="vertical" style={{ margin: 0, height: 24 }} />

            <Tabs
              tabBarStyle={{ marginBottom: -1 }}
              tabBarGutter={20}
              className="tabs-wrapper"
              items={[
                { key: uid + 1, label: "Bánh ngon hôm nay" },
                { key: uid + 2, label: "Đặt bàn" },
                { key: uid + 2, label: "Gọi món" },
              ]}
            ></Tabs> */}

            <Divider type="vertical" style={{ margin: "0 0 0 auto", height: 22 }} />

            <Flex align="center" style={{ margin: "0 0 0 0" }} gap={6}>
              <Tooltip title="Tự động xoay">
                <Button
                  type="text"
                  size="small"
                  icon={<Rotate3DIcon size={21} />}
                  style={{ color: autoRotate ? colorPrimary : colorBgBase }}
                  onClick={() => setAutoRotate(!autoRotate)}
                ></Button>
              </Tooltip>
              <Tooltip title="Xem mở rộng">
                <Button
                  type="text"
                  size="small"
                  style={{ color: colorBgBase }}
                  icon={<PanelBottomOpenIcon size={22} />}
                  // type={isAutoRotate ? "primary" : "default"}
                  // onClick={() => setIsAutoRotate((prev) => !prev)}
                ></Button>
              </Tooltip>
            </Flex>
          </Flex>
          <Tabs
            tabBarStyle={{ marginBottom: -1 }}
            tabBarGutter={12}
            items={[
              {
                key: uid + 0,
                label: (
                  <GalleryHorizontalIcon
                    strokeWidth={2.5}
                    size={18}
                    style={{ margin: "0 0 -4px 0" }}
                  />
                ),
              },
              { key: uid + 1, label: "Thực đơn" },
              { key: uid + 2, label: "Đặt bàn" },
              { key: uid + 3, label: "Gọi món" },
            ]}
            activeKey={selectedTab}
            onTabClick={(key) => {
              setSelectedTab(key);
            }}
          ></Tabs>
        </>
      }
      open
      {...props}
    >
      {selectedTab === uid + 0 && <Flex>{<></>}</Flex>}
    </StyleWrapper>
  );
};

const StyleButton01 = styled(Button)`
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  padding: 0;
  border-radius: 100rem;
  & .ant-btn-icon {
    margin-inline-end: 2px !important;
  }
`;

const StyleWrapper = styled(DrawerBottom)`
  & .ant-drawer-content-wrapper {
    border-radius: 10px 10px 0 0;
    @media screen and (max-width: 767.98px) {
      padding: 0 12px;
      box-shadow: none;
    }
  }
  & .ant-drawer-content {
    border-radius: 10px 10px 0 0;
    overflow: visible !important;
  }
  & .ant-drawer-header {
    padding: 0 12px;
    position: relative;
    & .ant-drawer-close {
      display: none;
    }
    & .title-wrapper {
      font-weight: 400;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      width: 100%;
      padding: 0 6px 4px 5px;
      & .tabs-wrapper .ant-tabs-tab {
        color: #fff;
      }
    }
  }
`;

export default ControlBar01;
