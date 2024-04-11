import "antd/dist/reset.css";
import "react-tuby/css/main.css";
import "@/styles/globals.css";
import "@/styles/loading.css";

import type { AppProps } from "next/app";
import ConfigProviders from "@/components/templated/ConfigProviders";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProviders>
      <Component {...pageProps} />
    </ConfigProviders>
  );
}
