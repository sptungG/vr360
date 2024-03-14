import "antd/dist/reset.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import ConfigProviders from "@/components/ConfigProviders";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProviders>
      <Component {...pageProps} />
    </ConfigProviders>
  );
}
