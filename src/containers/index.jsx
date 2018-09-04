import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import Loadable from "react-loadable";

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ "./Login"),
  loading: () => <div>Loading...</div>
});

// import TableComponent from "./TableComponent";
const TableComponent = Loadable({
  loader: () =>
    import(/* webpackChunkName: "tableComponent" */ "./TableComponent"),
  loading: () => <div>Loading...</div>
});

// import Main from "./main";
import Main from "./Main";
import fakeAuth from "../utils/Auth";

import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";

// import "../style.scss";

const App = () => (
  <LocaleProvider locale={zh_CN}>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route path="/table" component={TableComponent} /> */}
        <PrivateRoute path="/" component={Main} />
        {/* <Route component={NoMatch} /> */}
        <Redirect to={{ pathname: "/" }} />
      </Switch>
    </Router>
  </LocaleProvider>
);

// const fakeAuth = {
//   isAuthenticated: sessionStorage.getItem("token"),
//   authenticate(cb) {
//     sessionStorage.setItem("token", "token");
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     sessionStorage.removeItem("token");
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

/**
 * 私有路由
 * @param {} param0
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

// class Login extends React.Component {
//   state = {
//     redirectToReferrer: false
//   };

//   login = () => {
//     fakeAuth.authenticate(() => {
//       this.setState({ redirectToReferrer: true });
//     });
//   };

//   render() {
//     const { from } = this.props.location.state || { from: { pathname: "/" } };
//     const { redirectToReferrer } = this.state;

//     if (redirectToReferrer) {
//       return <Redirect to={from} />;
//     }

//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={this.login}>Log in</button>
//       </div>
//     );
//   }
// }

// const NoMatch = ({ location }) => (
//   <div>
//     <h3>
//       No match for <code>{location.pathname}</code>
//     </h3>
//   </div>
// );

export default App;
