import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

import System1 from "./system1";
import System2 from "./system2";
import System3 from "./system3";

import "./style";

class System extends Component {
  render() {
    return (
      <div className="system">
        <nav className="nav">
          <ul>
            <li>
              <Link to={`${this.props.match.url}/system1`}>system1</Link>
            </li>
            <li>
              <Link to={`${this.props.match.url}/system2`}>system2</Link>
            </li>
            <li>
              <Link to={`${this.props.match.url}/system3`}>system3</Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Switch>
            <Route
              path={`${this.props.match.url}/system1`}
              component={System1}
            />
            <Route
              path={`${this.props.match.url}/system2`}
              component={System2}
            />
            <Route
              path={`${this.props.match.url}/system3`}
              component={System3}
            />
            <Route component={() => <div>plz select left menu!</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default System;
