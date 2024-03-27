import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    mode: "light" | "dark";
    colorPrimary: string;
    generatedColors: string[];
  }
}
