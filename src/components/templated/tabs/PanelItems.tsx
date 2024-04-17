import styled from "@emotion/styled";
import { Badge, Button, Flex, Pagination, Tabs, Typography } from "antd";
import React, { useId } from "react";
import ScrollBar from "../ScrollBar";
import { NImage } from "@/components/Image";
import Avatar from "../Avatar";
import { formatCurrency, formatNumber } from "@/common/utils";
import { PlusIcon } from "lucide-react";
import { useTheme } from "@emotion/react";
import { rgba } from "emotion-rgba";

export const LIST_ITEM = [
  {
    id: "1284",
    imageUrl:
      "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/c/o/combo-chic_n-lover-bbq-2p.jpg",
    name: "COMBO CHIC'N LOVERS 2P",
    describe: "2 Miếng Gà Giòn (cay/ không cay) hoặc 2 Cánh Gà BBQ 1 Burger Bò Phô Mai 2 Nước ngọt",
    originPrice: 125000,
    currentPrice: 119000,
  },
  {
    id: "1293",
    imageUrl:
      "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/k/i/king-deli-1_1.jpg",
    name: "COMBO KING A 99K",
    describe: "2 Burger junior + 2 Fries S + 2 Drink",
    originPrice: 99000,
    currentPrice: 99000,
  },
  {
    id: "1285",
    imageUrl:
      "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/c/o/combo2-burger-ca_-ho_i-gio_n_1.jpg",
    name: "COMBO CHARCOAL CRISPY SALMON 168",
    describe: "1 Burger cá hồi + 1 Burger bò nướng Whopper ( cỡ vừa ) + 2 phô mai que + 2 Đồ uống",
    originPrice: 168000,
    currentPrice: 159000,
  },
  {
    id: "1294",
    imageUrl:
      "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/k/i/king-deli-2.jpg",
    name: "COMBO KING B 99K",
    describe: "2 Fried chicken + 1 Fries M + 1 Drink",
    originPrice: 99000,
    currentPrice: 99000,
  },
  {
    id: "1240",
    imageUrl:
      "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/c/o/combo_king_jr_1.jpg",
    name: "COMBO King Jr",
    describe: "1 Burger BBQ + 1 Khoai Tây Chiên nhỏ + 1 Đồ uống",
    originPrice: 125000,
    currentPrice: 125000,
  },
];

type TPanelItemsProps = {};

const PanelItems = ({}: TPanelItemsProps) => {
  const uid = useId();
  const { colorPrimary } = useTheme();
  return (
    <StyledPanel01>
      <StyledTabs01
        rootClassName="nav-top-wrapper"
        tabBarGutter={12}
        tabBarStyle={{ margin: 0 }}
        indicator={{ size: 0 }}
        items={[
          { key: "mon-moi", label: "Món mới", imageUrl: "/images/New.png" },
          { key: "burger", label: "Burger", imageUrl: "/images/P-BURGER.jpg" },
          { key: "combo", label: "Combo", imageUrl: "/images/P-VALUE-MEALS.jpg" },
          { key: "ga-ran", label: "Gà rán", imageUrl: "/images/P-GA-RAN.jpg" },
          { key: "com-vua", label: "Cơm vua", imageUrl: "/images/P-RICE-KING.png" },
          {
            key: "mon-an-kem",
            label: "Món ăn kèm",
            imageUrl: "/images/P-MON-AN-KEM.png",
          },
          { key: "thuc-uong", label: "Thức uống", imageUrl: "/images/P-VALUE-MEALS.jpg" },
        ].map((item, index) => ({
          key: item.key,
          label: (
            <Flex vertical justify="center" align="center" style={{ minWidth: 60 }}>
              <div className="thumbnail-wrapper">
                <NImage src={item.imageUrl} alt="" fill quality={1} />
              </div>
              <Typography.Paragraph
                strong
                className="title"
                ellipsis={{ rows: 2 }}
                style={{ fontSize: 13, margin: 0, flexShrink: 0 }}
              >
                {item.label}
              </Typography.Paragraph>
            </Flex>
          ),
        }))}
      ></StyledTabs01>

      <StyledProductList className="item-list">
        {LIST_ITEM.map((item, index) => (
          <div key={uid + "PRODUCTS" + item.id} className="item">
            <Avatar
              src={item.imageUrl}
              size={100}
              shape="square"
              rootClassName="item-imageUrl"
              style={{ marginBottom: 4 }}
            />
            <Typography.Title
              level={3}
              className="item-name"
              style={{ fontSize: 16, lineHeight: 1.1, margin: "0 0 4px" }}
            >
              {item.name}
            </Typography.Title>
            <Typography.Paragraph
              className="item-describe"
              ellipsis={{ rows: 2 }}
              style={{ lineHeight: 1.1, margin: "0 0 4px" }}
            >
              {item.describe}
            </Typography.Paragraph>

            <Flex justify="space-between" align="flex-end" style={{ marginTop: "auto" }}>
              <Flex vertical>
                {item.currentPrice !== item.originPrice && (
                  <Typography.Text type="secondary" delete style={{ fontSize: 13, lineHeight: 1 }}>
                    {formatNumber(item.originPrice)}
                  </Typography.Text>
                )}
                <Typography.Text
                  style={{
                    color: colorPrimary,
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  {formatCurrency(item.currentPrice)}
                </Typography.Text>
              </Flex>
              <Button type="text" className="btn-add" icon={<PlusIcon size={24} />}></Button>
            </Flex>
          </div>
        ))}
      </StyledProductList>

      <Flex vertical align="flex-end" className="actions-b">
        <Flex justify="flex-end" align="center" gap={6} className="top-wrapper">
          <Flex className="selected-items">
            <Typography.Text
              style={{ lineHeight: 1, textDecoration: "underline", color: colorPrimary }}
            >
              Đã chọn:
            </Typography.Text>
            <Badge count={1} overflowCount={99} />
          </Flex>
          <Button type="primary" size="small" style={{ borderRadius: 1000 }}>
            Đặt đồ ăn ngay
          </Button>
        </Flex>
        <Pagination total={100} pageSize={10} showSizeChanger={false} />
      </Flex>
    </StyledPanel01>
  );
};

const StyledTabs01 = styled(Tabs)`
  /* background: url("/images/BG-nav-bar-2.png") repeat; */
  padding: 0 6px;
  & .ant-tabs-nav::before {
    border: none;
  }
  & .ant-tabs-tab {
    /* color: #fff; */
    padding: 12px 0 6px;
    & .thumbnail-wrapper {
      position: relative;
      background-color: #fff;
      border-radius: 50%;
      min-width: 48px;
      height: 48px;
      box-shadow: 2px 2px 9px 1px #ececec;
      border: 2px solid #fff;
      & img {
        border-radius: 50%;
      }
    }
    & .title {
      /* color: #fff; */
    }
  }
  & .ant-tabs-tab.ant-tabs-tab-active {
    & .title {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }
  & .ant-tabs-tab[data-node-key="mon-moi"] {
    & .title {
      font-size: 12.5px !important;
    }
  }
  & .ant-tabs-tab[data-node-key="mon-an-kem"] {
    & .title {
      font-size: 12px !important;
    }
  }

  & .ant-tabs-nav-operations {
    display: none !important;
  }
`;

const StyledPanel01 = styled(ScrollBar)`
  height: 500px;
  overflow-y: auto;
  & .nav-top-wrapper {
  }
  & .item-list {
    flex: 1 1 auto;
    min-height: 0;
  }
  & .actions-b {
    flex-shrink: 0;
    padding: 0;
    position: sticky;
    bottom: 0;
    right: 0;
    margin-top: auto;
    z-index: 10;
    display: flex;
    & .top-wrapper {
      backdrop-filter: blur(10px);
      background: ${({ theme }) => rgba(theme.generatedColors[0], 0.8)};
      width: 100%;
      padding: 4px 6px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.8);
    }
    & .ant-pagination {
      margin-left: auto;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(2px);
      width: 100%;
      padding: 6px 6px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .ant-pagination-item-active {
        background: transparent;
      }
    }
    & .selected-items {
      overflow: hidden;
      padding: 0 3px 0 10px !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & .ant-badge .ant-badge-count {
      box-shadow: none;
      background-color: transparent;
      padding: 0;
      font-size: 16px;
      margin: 0 0;
      color: ${({ theme }) => theme.colorPrimary};
    }
  }
`;
const StyledProductList = styled(Flex)`
  padding: 6px;
  background-color: rgba(240, 235, 229, 0.01);
  --f-columns: 2;
  --f-gap: 6px;
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(-1 * var(--f-gap));
  margin-bottom: calc(-1 * var(--f-gap));
  @media screen and (min-width: 768px) {
    --f-columns: 3;
    --f-gap: 6px;
  }

  & > .item {
    margin-left: var(--f-gap);
    margin-bottom: var(--f-gap);
    width: calc((100% / var(--f-columns) - var(--f-gap)));
    display: flex;
    flex-direction: column;
    & .item-imageUrl {
      border: none;
      height: 172px !important;
      width: 100% !important;
    }
    & .btn-add {
      border-radius: 100rem;
      line-height: 1;
      color: ${({ theme }) => theme.colorPrimary} !important;
      border: 1px solid ${({ theme }) => rgba(theme.colorPrimary, 0.1)};
      background-color: ${({ theme }) => rgba(theme.colorPrimary, 0.1)} !important;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default PanelItems;
