import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HashRouter as Router, Route, Link,Switch } from "react-router-dom";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

import Loadable from "react-loadable";

const System = Loadable({
  loader: () => import(/* webpackChunkName: "System" */ "./System"),
  loading: () => <div>Loading...</div>
});

import TableComponent from "./TableComponent";
import DateDemo from "./DateDemo";
import Table from "./Table";
import Demo from "./demo";
import Music from "./music";
import Banner from "./Banner";
import Chart from "./Chart";
import Upload from "./Upload";

import Edit1 from "./Edit";
import Edit from "./Edit/index2.js";
import Edit4 from "./Edit/index5.js";
// import Edit from "./Edit";

import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";

import "../style.scss";

const App = () => (
  <LocaleProvider locale={zh_CN}>
    <Router>
      <div>
        <header className="header">
          <div className="logo">logo</div>
          {/* <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/topics">topics</Link>
              </Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu> */}
          <div>Logout</div>
        </header>
        <main>
          <Layout>
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      subnav 1
                    </span>
                  }
                >
                  <Menu.Item key="1">
                    <Link to="/table">TableComponent</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/date">Date</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="tables">封装表格</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="demo">Demo</Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="music">Music</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="upload">Upload</Link>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Link to="banner">Banner</Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link to="chart">Chart</Link>
                  </Menu.Item>
                  <Menu.Item key="09">
                    <Link to="edit1">Edit</Link>
                  </Menu.Item>
                  <Menu.Item key="9">
                    <Link to="edit">Edit</Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link to="edit4">Edit4</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      subnav 2
                    </span>
                  }
                >
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                      subnav 3
                    </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                <Route exact path="/" component={Home} />
                <Route exact path="/system" component={System} />

                <Route path="/table" component={TableComponent} />
                <Route path="/tables" component={Table} />
                <Route path="/date" component={DateDemo} />
                <Route path="/demo" component={Demo} />
                <Route path="/music" component={Music} />
                <Route path="/banner" component={Banner} />
                <Route path="/chart" component={Chart} />
                <Route path="/upload" component={Upload} />
                <Route path="/topics" component={Topics} />
                <Route path="/topics" component={Topics} />
                <Route path="/edit1" component={Edit1} />
                <Route path="/edit" component={Edit} />
                <Route path="/edit4" component={Edit4} />
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
