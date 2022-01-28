import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary : string;
      secondary : string;
      bg : string;
      hoverSecondary : string;
      bgHover : string;
    };

  }
}