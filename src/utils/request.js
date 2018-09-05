/**
 * request util
 */
import Storage from "./storage";

export default async ({
  url,
  method = "get",
  data = {},
  headers = { "Content-Type": "application/json" }
}) => {
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
  try {
    let response = await fetch(url, requestConfig);
    // console.log(response.status);

    switch (response.status) {
      case 404:
        console.log("404");
        break;
      case 401:
        Storage.clear();
        location.href = "/";
        break;
      case 200:
        console.log("200");
        let data;
        switch (requestConfig.headers.Accept) {
          case "application/json":
            data = await response.json();
            console.log("request data", data);

            if (data.code !== 0) {
              console.log("error", data.msg);
            } else {
              data = data.data;
            }

            break;
          case "text/html":
            data = response.text();
            break;
        }
        return data;
        break;
      default:
        console.log("default");
    }
  } catch (error) {
    console.log("error aaa", error);
    throw new Error(error);
  }
};
