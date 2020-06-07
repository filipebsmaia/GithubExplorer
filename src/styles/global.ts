import { createGlobalStyle, css } from 'styled-components';

import githubBackground from '../assets/github-background.svg';
import githubBackgroundDark from '../assets/github-background-dark.svg';

import light from './themes/light';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    transition: color 0.5s;
    transition: background-color 0.5s;
    transition: background 0.5s;
  }

  body {
    ${(props) => {
      const theme = props.theme;
      const logo =
        theme.title === 'light' ? githubBackground : githubBackgroundDark;

      return css`
        background: ${theme.colors.background} url(${logo}) no-repeat 70% top;
      `;
    }}
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button: {
    cursor: pointer;
  }


`;
