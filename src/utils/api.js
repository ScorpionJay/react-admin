const baseUrl = "https://m.shanghaim.net";
// const baseUrl = "http://localhost:8889";

const api = {
  login: baseUrl + "/api/login",
  musicList: baseUrl + "/api/music/page",
  banner: baseUrl + "/api/banner/get",
  addBanner: baseUrl + "/api/banner/save",
  deleteBanner: baseUrl + "/api/banner/delete"
};

export default api;
