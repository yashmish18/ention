import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      accent: string;
      white: string;
      gray: string;
      darkGray: string;
      cardBg: string;
      cardText: string;
      footerBg: string;
    };
    fonts: {
      main: string;
    };
    borderRadius: string;
  }
}
