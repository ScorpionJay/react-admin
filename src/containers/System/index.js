import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;

import Chart from "../Chart";
import Music from "../Music";
import Banner from "../Banner";
import Upload from "../upload";

import System1 from "./system1";
import System3 from "./system3";
import Video from "./video";
import Edit from "../Edit";

import "./style";

const Nav = [
  {
    name: "One",
    child: [
      { name: "Banner", link: "banner" },
      { name: "Music", link: "music" }
    ]
  },
  {
    name: "Two",
    child: [
      { name: "Upload", link: "upload" },
      { name: "Tree", link: "system1" },
      { name: "Drag table", link: "dragTable" },
      { name: "Video", link: "video" },
      { name: "Chart", link: "chart" },
      { name: "Edit", link: "edit" },
    ]
  }
];

class System extends Component {
  render() {
    const { pathname } = this.props.location;

    // TODO
    let openKeys = [];
    let selectedKeys = [];
    for (let i = 0; i < Nav.length; i++) {
      const item = Nav[i];
      if (openKeys.length !== 0) break;
      for (let j = 0; j < item.child.length; j++) {
        const subItem = item.child[j];
        if (pathname.indexOf(subItem.link) != -1) {
          openKeys.push(item.name);
          selectedKeys.push(subItem.name);
          break;
        }
      }
    }

    // Nav &&
    //   Nav.map(item => {
    //     item.child &&
    //       item.child.map(subItem => {
    //         if (pathname.indexOf(subItem.link) != -1) {
    //           openKeys.push(item.name);
    //           selectedKeys.push(subItem.name);
    //           break
    //         }
    //       });
    //   });

    return (
      <div className="system">
        <nav>
          <Menu
            // onClick={this.handleClick}
            style={{ width: 150 }}
            defaultOpenKeys={openKeys}
            defaultSelectedKeys={selectedKeys}
            mode="inline"
            theme="dark"
          >
            {Nav &&
              Nav.map((item, index) => (
                <SubMenu
                  key={item.name}
                  title={
                    <span>
                      <Icon type="appstore" />
                      <span>{item.name}</span>
                    </span>
                  }
                >
                  {item.child &&
                    item.child.map((item, index) => (
                      <Menu.Item key={item.name}>
                        <Link to={`${this.props.match.url}/${item.link}`}>
                          {item.name}
                        </Link>
                      </Menu.Item>
                    ))}
                </SubMenu>
              ))}
          </Menu>
        </nav>

        <div className="content">
          <Switch>
            <Route path={`${this.props.match.url}/chart`} component={Chart} />
            <Route path={`${this.props.match.url}/banner`} component={Banner} />
            <Route path={`${this.props.match.url}/music`} component={Music} />
            <Route path={`${this.props.match.url}/upload`} component={Upload} />
            <Route path={`${this.props.match.url}/edit`} component={Edit} />
            <Route
              path={`${this.props.match.url}/system1`}
              component={System1}
            />
            <Route
              path={`${this.props.match.url}/dragTable`}
              component={System3}
            />
            <Route path={`${this.props.match.url}/video`} component={Video} />
            <Route component={() => <div>plz select left menu!</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default System;
