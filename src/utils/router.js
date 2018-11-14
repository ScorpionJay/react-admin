import { HashRouter, BrowserRouter } from "react-router-dom";

export default (routerMode !== "hash" ? HashRouter : BrowserRouter);

export const fnPrefix = pathname => {
  const url = pathname.split("/");
  return `/${url[1]}/${url[2]}`;
};
