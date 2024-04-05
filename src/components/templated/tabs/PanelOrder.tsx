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
  Segmented,
  Table,
  Tabs,
  Typography,
} from "antd";
import { rgba } from "emotion-rgba";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { AlbumIcon, MapPinIcon, PackageCheckIcon } from "lucide-react";
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
        <Table
          size="small"
          showHeader={false}
          dataSource={LIST_ITEM}
          pagination={false}
          scroll={{ x: "100%" }}
          style={{
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
            margin: "0 0 12px",
          }}
          columns={[
            {
              key: "imageUrl",
              width: 96,
              render: (_, item, index) => (
                <Avatar src={item.imageUrl} size={80} shape="square" style={{ flexShrink: 0 }}>
                  {index + 1}
                </Avatar>
              ),
            },
            {
              key: "id",
              width: 400,
              render: (_, item) => (
                <Flex vertical style={{ margin: "0 0 0 -8px", height: 80 }}>
                  <Typography.Title level={5} ellipsis style={{ margin: 0, lineHeight: 1.2 }}>
                    {item.name}
                  </Typography.Title>
                  <Typography.Paragraph
                    type="secondary"
                    style={{ margin: "0 0 6px", lineHeight: 1.25 }}
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
              width: 88,
              render: (_, item, index) => (
                <StyledActionsCell vertical gap={12} style={{ margin: "0 0 -4px 0" }}>
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
            <StyledSummary align="center" justify="flex-end" gap={8}>
              <Typography.Text type="secondary">Tạm tính:</Typography.Text>
              <Typography.Text strong style={{ fontSize: 18 }}>
                {formatCurrency(119000)}
              </Typography.Text>
            </StyledSummary>
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

const StyledSummary = styled(Flex)`
  position: relative;
  width: 100%;
  & .ant-badge .ant-badge-count {
    box-shadow: none;
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    color: ${({ theme }) => theme.colorPrimary};
    font-size: 18px;
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
