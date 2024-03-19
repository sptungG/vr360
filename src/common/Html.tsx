import React from "react";
import { Html as R3Html } from "@react-three/drei";
import { HtmlProps } from "@react-three/drei/web/Html";
import ConfigProviders from "@/components/templated/ConfigProviders";

type THtmlProps = HtmlProps;

const Html = ({ children, ...props }: THtmlProps) => {
  return (
    <R3Html {...props}>
      <ConfigProviders>{children}</ConfigProviders>
    </R3Html>
  );
};

export default Html;
