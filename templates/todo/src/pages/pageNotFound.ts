import { TemplateResult, html } from "lit";
import { type IPage } from ".";
export const pageNotFoundName = "notFound";
export const pageNotFound: IPage = {
  render: function (): TemplateResult {
    return html` <h3>Oops, page not found!</h3> `;
  },
  getUrl: () => {
    return "/not-found";
  },
  urlPattern: "(not-found*|/?)",
  title: "Oops!",
};
