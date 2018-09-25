/**
 * fetch with timeout
 */

import { message } from "antd";

export default ({
  url,
  method = "get",
  data = {},
  headers = { "Content-Type": "application/json" },
  timeout = 20000
}) =>
  new Promise((resolve, reject) => {
    // Set timeout timer
    let timer = setTimeout(() => {
      message.error("Request timed out");
      reject(new Error("Request timed out"));
    }, timeout);

    let requestConfig = {
      method: method,
      headers: {
        Accept: "application/json"
      }
    };

    if (method === "post") {
      Object.defineProperty(requestConfig, "body", {
        value: JSON.stringify(data)
      });
    } else {
      let dataStr = "";
      for (let [k, v] of Object.entries(data)) {
        dataStr += `${k}=${v}&`;
      }

      if (dataStr !== "") {
        url = url + "?" + dataStr.substr(0, dataStr.lastIndexOf("&"));
      }
    }

    // header
    if (Object.keys(headers).length !== 0) {
      Object.assign(requestConfig.headers, headers);
    }
    console.log(requestConfig);
    fetch(url, requestConfig)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        console.log("error", error);
        throw new Error(error);
      })
      .finally(() => clearTimeout(timer));

    // switch (response.status) {
    //   case 404:
    //     console.log("404");
    //     break;
    //   case 401:
    //     Storage.clear();
    //     location.href = "/";
    //     break;
    //   case 200:
    //     console.log("200");
    //     let data;
    //     resolve(response);
    //     switch (requestConfig.headers.Accept) {
    //       case "application/json":
    //         data = await response.json();
    //         console.log("request data", data);

    //         if (data.code !== 0) {
    //           console.log("error", data.msg);
    //         } else {
    //           data = data.data;
    //         }

    //         break;
    //       case "text/html":
    //         data = response.text();
    //         break;
    //     }
    //     return data;
    //     break;
    //   default:
    //     console.log("default");
    // }
  }).then(data => data.json());
