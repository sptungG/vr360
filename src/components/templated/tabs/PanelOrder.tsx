import { DeliverySvg, TableSelectSvg } from "@/components/icons";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Radio,
  Segmented,
  Table,
  Tabs,
  Typography,
} from "antd";
import { rgba } from "emotion-rgba";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  AlbumIcon,
  HandCoins,
  HandCoinsIcon,
  MapPinIcon,
  PackageCheckIcon,
  WalletCardsIcon,
} from "lucide-react";
import React from "react";
import Avatar from "../Avatar";
import { formatCurrency, formatNumber } from "@/common/utils";

const LIST_ITEM = [
  {
    id: "1284",
    imageUrl:
      "https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/c/o/combo-chic_n-lover-bbq-2p.jpg",
    name: "COMBO CHIC'N LOVERS 2P",
    describe: "2 Miếng Gà Giòn (cay/ không cay) hoặc 2 Cánh Gà BBQ 1 Burger Bò Phô Mai 2 Nước ngọt",
    originPrice: 125000,
    currentPrice: 119000,
  },
];

type TPanelOrderProps = {};

const PanelOrder = ({}: TPanelOrderProps) => {
  const [form] = Form.useForm();
  const { colorPrimary } = useTheme();
  return (
    <StyledWrapper>
      <Card size="small" styles={{ body: { padding: 0 } }}>
        <StyledTable
          size="small"
          showHeader={false}
          dataSource={LIST_ITEM}
          pagination={false}
          scroll={{ x: "100%" }}
          tableLayout="auto"
          style={{
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
            margin: "0 0 12px",
          }}
          columns={[
            {
              key: "imageUrl",
              render: (_, item, index) => (
                <Avatar src={item.imageUrl} size={80} shape="square" style={{ flexShrink: 0 }}>
                  {index + 1}
                </Avatar>
              ),
            },
            {
              key: "id",
              render: (_, item) => (
                <Flex vertical style={{ margin: "0 0 0 -8px", height: 80, minWidth: 320 }}>
                  <Typography.Title level={5} ellipsis style={{ margin: 0, lineHeight: 1.2 }}>
                    {item.name}
                  </Typography.Title>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ margin: "0 0 6px", lineHeight: 1.25 }}
                    ellipsis={{ rows: 3 }}
                  >
                    {item.describe}
                  </Typography.Paragraph>

                  <Flex align="flex-start" gap={8} style={{ margin: "auto 0 0" }}>
                    <Typography.Text
                      style={{
                        color: colorPrimary,
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      {formatCurrency(item.currentPrice)}
                    </Typography.Text>
                    {item.currentPrice !== item.originPrice && (
                      <Typography.Text
                        type="secondary"
                        delete
                        style={{ fontSize: 13, lineHeight: 1 }}
                      >
                        {formatNumber(item.originPrice)}
                      </Typography.Text>
                    )}
                  </Flex>
                </Flex>
              ),
            },
            {
              key: "actions",
              fixed: "right",
              width: 72,
              render: (_, item, index) => (
                <StyledActionsCell vertical gap={12} style={{ margin: "0 0 -4px 0", width: 72 }}>
                  <Badge
                    size="small"
                    overflowCount={999}
                    count={1}
                    styles={{ root: { marginTop: "auto", alignSelf: "center" } }}
                  />
                  <Flex gap={2} justify="space-between">
                    <Button
                      type="text"
                      icon={<MinusOutlined />}
                      style={{ background: "rgba(0,0,0,0.03)", borderRadius: 1000 }}
                    ></Button>
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      style={{
                        color: colorPrimary,
                        background: rgba(colorPrimary, 0.1),
                        borderRadius: 1000,
                      }}
                    ></Button>
                  </Flex>
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    danger
                    size="small"
                    className="btn-delete"
                  ></Button>
                </StyledActionsCell>
              ),
            },
          ]}
          footer={() => (
            <Flex align="center" justify="flex-end" gap={8}>
              <Typography.Text type="secondary">Tạm tính:</Typography.Text>
              <Typography.Text strong style={{ fontSize: 18 }}>
                {formatCurrency(119000)}
              </Typography.Text>
            </Flex>
          )}
        />

        <Typography.Paragraph type="secondary" style={{ margin: "0 0 2px 0", padding: "0 8px" }}>
          Hình thức nhận hàng:
        </Typography.Paragraph>
        <Form form={form} layout="vertical" size="middle" style={{ padding: "0 8px" }}>
          <StyledTabs
            tabBarGutter={0}
            tabBarStyle={{ marginBottom: 6 }}
            indicator={{ size: 0 }}
            // onTabClick={(k) => setSelectedTabPromo(k)}
            items={[
              {
                key: "giao-hang",
                label: (
                  <Flex align="center" gap={4}>
                    <DeliverySvg style={{ width: 26, strokeWidth: 2 }} />
                    Giao hàng
                  </Flex>
                ),
                children: (
                  <Flex vertical>
                    <Typography.Title type="secondary" level={5} style={{ margin: "0 0 8px" }}>
                      Thông tin nhận hàng:
                    </Typography.Title>

                    <Form.Item label="Người nhận" name={"name"}>
                      <Input placeholder="Nguyen Van A" />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name={"phoneNumber"}>
                      <Input placeholder="•••• ••• •••" showCount />
                    </Form.Item>

                    <Button
                      type="text"
                      className="btn"
                      style={{
                        background: "rgba(0,0,0,0.05)",
                        padding: "0 6px 0 4px",
                        marginBottom: 8,
                      }}
                      icon={<MapPinIcon size={16} />}
                    >
                      Sử dụng vị trí hiện tại của bạn
                    </Button>

                    <Form.Item label="Địa chỉ chi tiết" name={"address"}>
                      <Input.TextArea />
                    </Form.Item>

                    <Typography.Title type="secondary" level={5} style={{ margin: "0 0 8px" }}>
                      Phương thức thanh toán:
                    </Typography.Title>

                    <Form.Item name={"paymentMethod"}>
                      <StyledRadio02>
                        <Radio.Button value={1}>
                          <Flex gap={8} align="center">
                            <Avatar
                              size={44}
                              icon={<HandCoinsIcon size={22} />}
                              style={{
                                color: colorPrimary,
                                background: rgba(colorPrimary, 0.05),
                                borderColor: rgba(colorPrimary, 0.1),
                              }}
                            ></Avatar>
                            <Typography.Text strong style={{ color: "inherit" }}>
                              Thanh toán khi nhận hàng
                            </Typography.Text>
                          </Flex>
                        </Radio.Button>

                        <Radio.Button value={2}>
                          <Flex gap={8} align="center">
                            <Avatar
                              size={44}
                              src={
                                "https://www.onepay.vn/wp-content/uploads/2022/01/Logo_OnePay.svg"
                              }
                              icon={<WalletCardsIcon size={22} />}
                              style={{ objectFit: "contain", background: "#e6f4ff" }}
                            ></Avatar>
                            <Flex vertical>
                              <Typography.Text strong style={{ color: "inherit" }}>
                                Thanh toán qua OnePay
                              </Typography.Text>
                              <Typography.Text type="secondary">
                                Thanh toán online qua thẻ
                              </Typography.Text>
                            </Flex>
                          </Flex>
                        </Radio.Button>

                        <Radio.Button value={3}>
                          <Flex gap={8} align="center">
                            <Avatar
                              size={44}
                              src="https://www.onepay.vn/wp-content/uploads/2021/12/Group-198.png"
                              icon={<WalletCardsIcon size={22} />}
                              style={{ background: "#fff0f6" }}
                            ></Avatar>
                            <Typography.Text strong style={{ color: "inherit" }}>
                              Thanh toán qua Momo
                            </Typography.Text>
                          </Flex>
                        </Radio.Button>
                      </StyledRadio02>
                    </Form.Item>

                    <Button block type="primary" size="large" style={{ margin: "0 0 8px" }}>
                      Xác nhận đơn hàng
                    </Button>
                  </Flex>
                ),
              },
              {
                key: "dat-den-lay",
                label: (
                  <Flex align="center" gap={4}>
                    <PackageCheckIcon size={22} strokeWidth={1.2} />
                    Đặt đến lấy
                  </Flex>
                ),
              },
            ]}
          />
        </Form>
      </Card>

      {/* <TableSelectSvg style={{ width: 100, color: "#AD172B" }} /> */}
    </StyledWrapper>
  );
};

const StyledRadio02 = styled(Radio.Group)`
  --f-columns: 1;
  --f-gap: 8px;
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(-1 * var(--f-gap));
  margin-bottom: calc(-1 * var(--f-gap));
  & > * {
    margin-left: var(--f-gap);
    margin-bottom: var(--f-gap);
    width: calc((100% / var(--f-columns) - var(--f-gap)));
    border: 1px solid rgba(0, 0, 0, 0.15) !important;
    border-radius: 8px;
    padding: 8px;
    height: auto;
    min-height: 60px;
    &::before {
      display: none !important;
    }
    &.ant-radio-button-wrapper-checked {
      border-color: currentColor !important;
    }
  }
  @media screen and (min-width: 768px) {
    --f-columns: 2;
    --f-gap: 8px;
  }
`;

const StyledTable = styled(Table)`
  & .ant-table-footer {
    position: relative;
    width: 100%;
    border-radius: 0;
    & .ant-badge .ant-badge-count {
      box-shadow: none;
      background-color: transparent;
      padding: 0;
      border-radius: 0;
      color: ${({ theme }) => theme.colorPrimary};
      font-size: 18px;
    }
  }
`;

const StyledActionsCell = styled(Flex)`
  position: relative;
  height: 76px;
  width: 100%;
  & .ant-badge .ant-badge-count {
    box-shadow: none;
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    color: ${({ theme }) => theme.colorPrimary};
    font-size: 18px;
  }
  & .btn-delete {
    position: absolute;
    top: 4px;
    right: 6px;
    transform: translate(50%, -50%);
  }
`;

const StyledWrapper = styled.div`
  padding: 6px;
  height: 500px;
  overflow-y: auto;
`;

const StyledTabs = styled(Tabs)`
  & .ant-tabs-nav::before {
    border: none;
  }
  & .ant-tabs-tab {
    --bg-color: rgba(255, 255, 255, 0);
    --border-color: rgba(255, 255, 255, 0);
    position: relative;
    width: fit-content;
    flex-shrink: 0;
    z-index: 0;
    padding: 0 12px;
    height: 32px;
    border-radius: 100rem;
    border: 1px solid var(--border-color);
    background: var(--bg-color);
    font-size: 13px;
    &:not(:first-of-type) {
      margin-left: -1px;
      z-index: 0;
    }
  }
  & .ant-tabs-tab.ant-tabs-tab-active {
    --bg-color: ${({ theme }) => rgba(theme.colorPrimary, 0.2)};
    --border-color: ${({ theme }) => rgba(theme.colorPrimary, 0.2)};
  }
`;

export default PanelOrder;
