import useSceneState from "@/common/useSceneState";
import styled from "@emotion/styled";
import {
  Badge,
  Button,
  ButtonProps,
  Card,
  Carousel,
  Divider,
  DrawerProps,
  Flex,
  Form,
  Pagination,
  Tabs,
  Typography,
  theme,
} from "antd";
import {
  ArrowRightFromLineIcon,
  BadgePercent,
  CircleChevronRightIcon,
  GalleryHorizontalIcon,
  HeartIcon,
  MessageCircleMoreIcon,
  PanelBottomCloseIcon,
  PanelBottomOpenIcon,
  PanelTopOpenIcon,
  PlusIcon,
  Rotate3DIcon,
  ShoppingCartIcon,
  SquareCheckBigIcon,
  StoreIcon,
} from "lucide-react";
import { useId, useState } from "react";
import DrawerBottom from "../DrawerBottom";
import Tooltip from "../Tooltip";
import Avatar from "./Avatar";
import { useTheme } from "@emotion/react";
import { SCENES } from "@/common/data";
import ScrollBar from "./ScrollBar";
import { formatCurrency, formatNumber } from "@/common/utils";
import { rgba } from "emotion-rgba";
import { PlusOutlined } from "@ant-design/icons";
import { PromotionSvg } from "../icons";
import Image, { NImage } from "../Image";
import PanelPromo from "./tabs/PanelPromo";
import PanelItems from "./tabs/PanelItems";
import PanelScenes from "./tabs/PanelScenes";
import PanelBookingTable from "./tabs/PanelBookingTable";
import PanelOrder from "./tabs/PanelOrder";
import { usePrevious } from "react-use";

type TControlBar01Props = DrawerProps & {};

const ControlBar01 = ({ children, ...props }: TControlBar01Props) => {
  const uid = useId();
  const [form] = Form.useForm();
  const {
    token: { colorBgBase, colorTextLabel, colorPrimary, colorTextTertiary },
  } = theme.useToken();
  const { generatedColors } = useTheme();

  const { id, autoRotate, isViewing } = useSceneState((s) => s);
  const setAutoRotate = useSceneState((s) => s.setAutoRotate);

  const [selectedTab, setSelectedTab] = useState<string>("khu-vuc");
  const prevSelectedTab = usePrevious(selectedTab);
  const [selectedTabPromo, setSelectedTabPromo] = useState<string>("1233");
  const [count01, setCount01] = useState(1);
  const [count02, setCount02] = useState(1);

  return (
    <>
      <StyledTitle
        className="left"
        align="start"
        vertical
        gap={0}
        style={{ userSelect: "none", maxWidth: "calc(100%-48px)" }}
      >
        <Flex align="end">
          <Avatar
            size={32}
            style={{
              margin: "-2px 6px 0 0",
              borderColor: "none",
              backgroundColor: "rgba(255,255,255,0.25)",
            }}
            src="/images/BK_LOGO_ICON.png"
            icon={<StoreIcon color={colorBgBase} size={20} />}
          ></Avatar>
          <Flex vertical>
            <Typography.Title
              level={2}
              className="title"
              style={{ margin: 0, color: colorBgBase, lineHeight: 1, fontSize: 15 }}
            >
              Burger King
            </Typography.Title>
            <Typography.Text type="secondary" style={{ fontSize: 10, color: colorBgBase }}>
              2 giờ trước
            </Typography.Text>
          </Flex>
        </Flex>
        <Typography.Paragraph
          ellipsis={{ rows: 2, expandable: true, symbol: "Xem thêm" }}
          style={{ margin: 0, fontSize: 13, color: "#f3f4f6" }}
        >
          Được thành lập vào năm 1954, BURGER KING® hiện là chuỗi nhà hàng thức ăn nhanh lớn nhất
          thế giới. Mỗi ngày, có hơn 11 triệu thực khách đến với các nhà hàng BURGER KING® trên khắp
          thế giới để thưởng thức các món ăn chất lượng cao, hương vị tuyệt hảo và giá cả phải
          chăng.
        </Typography.Paragraph>
      </StyledTitle>
      <StyledTitle className="right" vertical align="end" gap={20} style={{ width: 48 }}>
        <Flex gap={12} vertical>
          <ButtonBadge
            type="text"
            size="small"
            style={{ color: colorBgBase }}
            icon={<HeartIcon size={21} />}
            count={count01}
            onClick={() => setCount01((p) => p + 1)}
          />

          <ButtonBadge
            type="text"
            size="small"
            style={{ color: colorBgBase }}
            icon={<MessageCircleMoreIcon size={21} />}
            count={count02}
            onClick={() => setCount02((p) => p + 1)}
          />
        </Flex>

        <Flex align="center" vertical style={{ margin: "auto 0 0 0" }} gap={10}>
          <Tooltip title="Tự động xoay">
            <Button
              type="text"
              size="small"
              icon={<Rotate3DIcon size={21} />}
              style={{ color: autoRotate ? colorPrimary : colorBgBase }}
              onClick={() => setAutoRotate(!autoRotate)}
            ></Button>
          </Tooltip>
          <Tooltip title="Mở rộng">
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
      </StyledTitle>
      <StyleWrapper
        open
        width={720}
        styles={{
          mask: { display: "none" },
          body: { padding: 0, minHeight: 100 },
          content: {
            backgroundColor:
              selectedTab === "khu-vuc" ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.8)",
          },
        }}
        title={
          <StyledTabsNav01
            tabBarStyle={{
              marginBottom: -1,
              color: colorTextLabel,
            }}
            tabBarGutter={12}
            items={[
              {
                key: "khu-vuc",
                label: (
                  <GalleryHorizontalIcon
                    strokeWidth={2.5}
                    size={18}
                    style={{ margin: "0 0 -4px 0" }}
                  />
                ),
              },
              {
                key: "khuyen-mai",
                label: (
                  <>
                    <BadgePercent
                      strokeWidth={2.5}
                      size={18}
                      color={generatedColors[5]}
                      fill={generatedColors[0]}
                      style={{ margin: "0 0 -4px 0" }}
                    />
                    <Badge count={3} overflowCount={99} />
                  </>
                ),
              },
              { key: "thuc-don", label: "Thực đơn" },
              {
                key: "dat-do-an",
                label: (
                  <>
                    Đặt đồ ăn
                    <Badge count={1} overflowCount={99} />
                  </>
                ),
              },
              {
                key: "dat-ban",
                label: (
                  <>
                    Đặt bàn
                    <Badge count={1} overflowCount={99} />
                  </>
                ),
              },
            ]}
            activeKey={String(selectedTab)}
            onTabClick={(key) => {
              setSelectedTab(key);
            }}
          />
        }
      >
        {selectedTab === "khu-vuc" && <PanelScenes />}
        {/*  */}
        {selectedTab === "khuyen-mai" && <PanelPromo />}
        {/*  */}
        {selectedTab === "thuc-don" && <PanelItems />}
        {/*  */}
        {selectedTab === "dat-do-an" && <PanelOrder />}
        {/*  */}
        {selectedTab === "dat-ban" && <PanelBookingTable />}
      </StyleWrapper>
    </>
  );
};

const StyledTitle = styled(Flex)`
  position: fixed;
  bottom: 148px;
  &.left {
    left: 0;
    width: calc(100% - 40px);
    padding-left: 6px;
    max-width: 720px;
  }
  &.right {
    right: 0;
    padding-right: 6px;
  }
`;

const StyledTabsNav01 = styled(Tabs)`
  & .ant-tabs-nav::before {
    border: none;
  }
  & .ant-tabs-tab {
    font-size: 13px;
    font-weight: 600;
    color: inherit;
    & .ant-badge {
      margin: -2px 0 0 4px;
      color: ${({ theme }) => theme.colorPrimary};
      .ant-badge-count {
        box-shadow: none;
        background-color: transparent;
        padding: 0;
        min-width: 10px;
        font-size: 12px;
        color: inherit;
      }
    }
  }
  & .ant-tabs-tab.ant-tabs-tab-active {
  }
`;

type TButtonBadgeProps = ButtonProps & { count?: number };
const ButtonBadge = ({ count = 0, children, icon, ...props }: TButtonBadgeProps) => {
  return (
    <StyleButton01 {...props}>
      {icon}
      <Badge
        size="small"
        overflowCount={999}
        count={count}
        styles={{ root: { paddingRight: count > 99 ? 0 : 4 } }}
      />
    </StyleButton01>
  );
};
const StyleButton01 = styled(Button)`
  height: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  padding: 0;
  & .ant-btn-icon {
    margin-inline-end: 2px !important;
  }
  & .ant-badge .ant-badge-count {
    box-shadow: none;
    background-color: transparent;
    padding: 0;
    border-radius: 0;
  }
`;

const StyleWrapper = styled(DrawerBottom)`
  & .ant-drawer-content-wrapper {
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    @media screen and (max-width: 767.98px) {
      padding: 0 6px;
      box-shadow: none;
    }
  }
  & .ant-drawer-content {
    border-radius: 10px 10px 0 0;
    overflow: visible !important;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
  }
  & .ant-drawer-header {
    padding: 0 6px;
    position: relative;
    & .ant-drawer-close {
      display: none;
    }
  }
  & .ant-drawer-footer {
    padding: 0 6px 2px;
    position: relative;
  }
`;

export default ControlBar01;
