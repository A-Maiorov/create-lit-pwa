import { css } from "lit";
// How it works: https://lit.dev/docs/components/styles/#sharing-styles
// Theming: https://lit.dev/docs/components/styles/#theming

export const darkThemeCss = css`
  :host([theme="dark"]) {
    --main-bg: rgb(29 29 29);
    --main-color: rgba(213, 213, 214, 1);

    --second-bg: rgb(58 58 61);
    --second-color: rgb(183 186 190);

    --third-bg: rgb(103 104 106);
    --third-color: rgb(203 203 203);
  }
`;

export const lightThemeCss = css`
  :host([theme="light"]) {
    --main-bg: rgba(255, 255, 255, 1);
    --man-color: rgba(40, 40, 44, 1);

    --second-bg: rgb(233 233 234);
    --second-color: rgb(95 100 106);

    --third-bg: rgb(224 224 224);
    --third-color: rgb(205 182 106);
  }
`;

export const roundedBlock = css`
  .rounded-block {
    padding: 15px;
    margin-bottom: 5px;
    border-radius: 15px;
    background-color: var(--second-bg);
    color: var(--second-color);
  }
`;

export const roundedButton = css`
  .rounded-button {
    height: 30px;
    border-radius: 18px;
    background-color: var(--second-bg);
    color: var(--second-color);
    display: flex;
    padding: 0;
    padding-left: 5px;
    padding-right: 5px;
  }

  .rounded-button[disabled] {
    opacity: 0.4;
  }
`;
export const iconCss = css`
  .icon {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
  }
`;
