import React from "react";
import { Global, ThemeProvider, css } from "@emotion/react";
import { ConfigProvider as AntdConfigProvider, ConfigProviderProps } from "antd-mobile";
// import en_US from 'antd/locale/en_US';
// import ko_KR from 'antd/locale/ko_KR';
import en_US from "antd-mobile/es/locales/en-US";
import { generate } from "@ant-design/colors";

type TConfigProviderProps = {
  children: React.ReactNode;
  mode?: "light" | "dark";
};

export const colorPrimary = "#2A9476";
const generatedColors = generate(colorPrimary);

export const ConfigProviders = ({ children, mode = "light" }: TConfigProviderProps) => {
  return (
    <AntdConfigProvider locale={en_US}>
      <ThemeProvider theme={{ mode, colorPrimary, generatedColors }}>
        <Global
          styles={css`
            :root:root {
              --adm-color-primary: ${colorPrimary};
            }
          `}
        />
        {children}
      </ThemeProvider>
    </AntdConfigProvider>
  );
};

export default ConfigProviders;
