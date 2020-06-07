import 'styled-componets';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;

      primary: string;
      secondary: string;

      title: string;
      text: string;
      subtext: string;

      success: string;
      error: string;
    };
  }
}
