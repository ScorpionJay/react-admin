import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

import TableComponent from "../TableComponent";
import Table from "../Table";
import Demo from "../demo";
import Banner from "../Banner";
import Chart from "../Chart";
import Upload from "../Upload";

import Edit1 from "../Edit";
import Edit from "../Edit/index2.js";
import Edit4 from "../Edit/index5.js";
// import Edit from "./Edit";

import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";

import Loadable from "react-loadable";

const Music = Loadable({
  loader: () => import(/* webpackChunkName: "Music" */ "../Music"),
  loading: () => <div>Loading...</div>
});

const System = Loadable({
  loader: () => import(/* webpackChunkName: "System" */ "../System"),
  loading: () => <div>Loading...</div>
});

import "./style";

const Nav = [
  { name: "Music", link: "music" },
  { name: "Chart", link: "chart" },
  { name: "System", link: "system" }
];

const App = match => (
  <LocaleProvider locale={zh_CN}>
    <Router>
      <div>
        {console.log(match)}
        <header className="header">
          <div className="header-left">
            <div className="logo" />
            <nav>
              <ul>
                {Nav &&
                  Nav.map((item, index) => (
                    <li key={index}>
                      <NavLink to={"/" + item.link}>{item.name}</NavLink>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          <div
            onClick={() => {
              sessionStorage.removeItem("token");
              match.history.replace("/login");
            }}
          >
            Logout
          </div>
        </header>
        <main>
          <Layout>
            <Layout style={{ padding: "0 24px 24px" }}>
              {/* <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                <Switch>
                  <Route exact path={`${match.url}/`} component={Home} />
                  <Route path="/music" component={Music} />
                  <Route path="/system" component={System} />
                  <Route path="/chart" component={Chart} />
                  <Redirect to={{ pathname: "/system" }} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </main>
        {/* <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/table">TableComponent</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul> */}
      </div>
    </Router>
  </LocaleProvider>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default App;
