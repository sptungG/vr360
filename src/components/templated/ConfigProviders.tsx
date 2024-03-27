import React from "react";
import { ThemeProvider } from "@emotion/react";
import { ConfigProvider as AntdConfigProvider, App, ConfigProviderProps, theme } from "antd";
// import en_US from 'antd/locale/en_US';
// import ko_KR from 'antd/locale/ko_KR';
import vi_VN from "antd/locale/vi_VN";
import { generate } from "@ant-design/colors";

type TConfigProviderProps = {
  children: React.ReactNode;
  mode?: "light" | "dark";
};

const { darkAlgorithm, defaultAlgorithm } = theme; 
export const colorPrimary = "#e04218";
const generatedColors = generate(colorPrimary);

export const ConfigProviders = ({ children, mode = "light" }: TConfigProviderProps) => {
  return (
    <AntdConfigProvider
      locale={vi_VN}
      theme={{
        token: { colorPrimary, colorLink: colorPrimary },
        algorithm: mode === "dark" ? darkAlgorithm : defaultAlgorithm,
      }}
      button={{ style: { boxShadow: "none" } }}
    >
      <ThemeProvider theme={{ mode, colorPrimary, generatedColors }}>
        <App component={false}>{children}</App>
      </ThemeProvider>
    </AntdConfigProvider>
  );
};

export default ConfigProviders;
