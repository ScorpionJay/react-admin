const fakeAuth = {
  isAuthenticated: sessionStorage.getItem("token"),
  authenticate(cb) {
    sessionStorage.setItem("token", "token");
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    sessionStorage.removeItem("token");
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default fakeAuth;
