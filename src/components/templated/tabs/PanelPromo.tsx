import DrawerBottom from "@/components/PopupBottom";
import Image from "@/components/Image";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Tabs, Typography } from "antd";
import { useState } from "react";

const DATA = [
  {
    id: "1233",
    imageUrl:
      "https://www.burgerking.com.my/upload/image/offer/128/J1004748_Raya2024-Campaign%28Jan%2724%29_DigitalAdaptaions_WebPanel_900x480.jpg",
    name: "TRIPLE CHEESE SPICY TENDERCRISP",
  },
  {
    id: "1234",
    imageUrl: "https://burgerking.vn/media/news/image/b/o/bogo-bannerweb-m_c-km.jpg",
    name: "BUY 1 GET 1 - EVERY THURSDAY",
  },
  {
    id: "1235",
    imageUrl:
      "https://www.burgerking.com.my/upload/image/offer/111/Web%20Panel_900px%20x%20480px%20%282%29.jpg",
    name: "VALUE COMBO",
  },
];

type TPanelPromoProps = {};

const PanelPromo = ({}: TPanelPromoProps) => {
  const { colorPrimary } = useTheme();

  const [selectedTabPromo, setSelectedTabPromo] = useState<string>("");

  return (
    <>
      <StyledPromoTabs
        tabBarGutter={0}
        tabBarStyle={{ margin: 0 }}
        onTabClick={(k) => setSelectedTabPromo(k)}
        items={DATA.map((item, index) => ({
          key: String(item.id),
          label: (
            <>
              <Image src={item.imageUrl} alt=""></Image>
              <div className="actions-b">
                <Typography.Paragraph
                  strong
                  className="title"
                  style={{ fontSize: 14, color: "#fff", margin: 0, lineHeight: 1.1 }}
                  ellipsis={{ rows: 2 }}
                >
                  {item.name}
                </Typography.Paragraph>
              </div>
            </>
          ),
        }))}
      />

      <StyleDrawerWrapper
        destroyOnClose
        open={selectedTabPromo === "1234"}
        onClose={() => setSelectedTabPromo("")}
        width={720}
        styles={{
          mask: { display: "none" },
          body: { padding: "6px 6px 0", minHeight: 100 },
          content: { backgroundColor: "rgba(255, 255, 255, 0.8)" },
        }}
        title={selectedTabPromo === "1234" && "BUY 1 GET 1 - EVERY THURSDAY"}
      >
        {selectedTabPromo === "1234" && (
          <>
            <Image
              rootClassName="banner-wrapper"
              src="https://burgerking.vn/media/news/image/b/o/bogo-bannerweb-m_c-km.jpg"
              alt=""
              style={{ margin: "0 0 4px" }}
            ></Image>
            <Typography.Title
              level={5}
              style={{ color: colorPrimary, marginBottom: 4, lineHeight: 1.1 }}
            >
              {"BUY 1 GET 1 - EVERY THURSDAY"}
            </Typography.Title>
            <div
              className="content"
              style={{ fontSize: 13 }}
              dangerouslySetInnerHTML={{
                __html: `
<p><em><strong><span>Khách hàng khi mua hàng tại các cửa hàng Burger King hoặc đặt hàng t<em><strong>hông qua Hotine 1900 6960 hoặc qua Website https://burgerking.vn/&nbsp;</strong></em>sẽ nhận được ưu đãi : Mua 1 combo ( 1 bánh + 1 nước ) được tặng 1 bánh burger cỡ vừa&nbsp;</span><span><br></span></strong></em></p>
<p><em><strong>Bánh tặng :&nbsp;</strong></em></p>
<p><em><strong>- Burger bò nướng Whopper Jr&nbsp;</strong></em></p>
<p><em><strong>- Burger gà phô mai&nbsp;</strong></em></p>
<p><em><strong>- Burger bò phô mai&nbsp;</strong></em></p>
<p><em><strong>- Burger bò nướng hành chiên&nbsp;</strong></em></p>
<p><em><strong>- Burger cá&nbsp;<br><br><span>Áp dụng toàn hệ thống các cửa hàng Burger King (trừ Burger King Sân bay ).</span><br><span>Áp dụng với khách hàng mua tại cửa hàng hoặc đặt hàng thông qua Hotine 1900 6960 hoặc qua Website https://burgerking.vn/</span><br><span>Không áp dụng vào các ngày Lễ Tết</span></strong></em></p>`,
              }}
            ></div>
          </>
        )}
      </StyleDrawerWrapper>
    </>
  );
};

const StyledPromoTabs = styled(Tabs)`
  & .ant-tabs-tab {
    position: relative;
    height: 100px;
    width: fit-content;
    min-width: 200px;
    max-width: 300px;
    flex-shrink: 0;
    border: 1px solid transparent;
    z-index: 0;
    color: #fff;
    &:not(:first-of-type) {
      margin-left: -1px;
      z-index: 0;
    }
    & .ant-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    & .actions-b {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 8px 4px 8px;
      width: 100%;
      height: fit-content;
      min-height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 90%);
      & > * {
        white-space: normal;
      }
    }
  }
  & .ant-tabs-tab.ant-tabs-tab-active {
  }
  & .ant-tabs-nav-operations {
    display: none !important;
  }
`;

const StyleDrawerWrapper = styled(DrawerBottom)`
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
    position: relative;
    overflow: visible !important;
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    & .banner-wrapper img {
      border-radius: 8px;
    }
  }
  & .ant-drawer-body {
    max-height: 50dvh;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  & .ant-drawer-header {
    padding: 6px 6px;
    & .ant-drawer-header-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row-reverse;
    }
    & .ant-drawer-close {
      margin: 0;
      z-index: 10;
    }
    & .ant-drawer-title {
      font-size: 14px;
      line-height: 1.1;
    }
  }
  & .ant-drawer-footer {
    padding: 6px 6px 6px;
    position: relative;
    & .btn-01 {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100rem;
    }
  }
`;

export default PanelPromo;
