/*
 * @Author: jay
 * @Date: 2018-11-13 17:03:39
 * @Last Modified by: jay
 * @Last Modified time: 2018-11-15 10:39:23
 */

import React from "react";
import { Route, NavLink, Redirect, Switch, Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logoutAction } from "../Login/action";

import { Popover, Icon } from "antd";

import Router, { fnPrefix } from "../../utils/router";

import Loadable from "react-loadable";

import "./style";

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ "../Home"),
  loading: () => <div>Loading...</div>
});

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "Profile" */ "../Profile"),
  loading: () => <div>Loading...</div>
});

const Chart = Loadable({
  loader: () => import(/* webpackChunkName: "Chart" */ "../Chart"),
  loading: () => <div>Loading...</div>
});

const Music = Loadable({
  loader: () => import(/* webpackChunkName: "Music" */ "../Music"),
  loading: () => <div>Loading...</div>
});

const System = Loadable({
  loader: () => import(/* webpackChunkName: "System" */ "../System"),
  loading: () => <div>Loading...</div>
});

const Nav = [
  { name: "Home", link: "home" },
  { name: "Music", link: "music" },
  { name: "Chart", link: "chart" },
  { name: "System", link: "system" }
];

const Main = ({ match, history, logoutAction }) => (
  <Router>
    <React.Fragment>
      {/* header */}
      <header className="header">
        <div className="header-left">
          <div className="logo" />
          <nav>
            <ul>
              {Nav &&
                Nav.map((item, index) => (
                  <li key={index}>
                    <NavLink to={`${fnPrefix(match.url)}/` + item.link}>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        <Popover
          overlayClassName="home_profile_popover"
          placement="bottom"
          content={
            <ul>
              <li>
                <Link to={`${fnPrefix(match.url)}/profile`}>Profile</Link>
              </li>
              <li>Setting</li>
              <li
                onClick={() => {
                  logoutAction();
                  history.replace(`${fnPrefix(match.url)}/login`);
                }}
              >
                Logout
              </li>
            </ul>
          }
          trigger="hover"
        >
          <div style={{ marginRight: 45 }} className="home_account">
            <Icon type="user" style={{ marginRight: 10 }} />
            <span>Jay</span>
          </div>
        </Popover>
      </header>

      <main>
        <Switch>
          {/* <Route exact path={`${match.url}/`} component={Home} /> */}
          <Route exact path={`/*/*/home`} component={Home} />
          <Route path={`/*/*/profile`} component={Profile} />
          <Route path={`/*/*/music`} component={Music} />
          <Route path={`/*/*/system`} component={System} />
          <Route path={`/*/*/chart`} component={Chart} />
          <Redirect to={{ pathname: `${fnPrefix(match.url)}/home` }} />
        </Switch>
      </main>
    </React.Fragment>
  </Router>
);

const mapStateToProps = state => ({
  token: state.loginReducer.token
});

const mapDispatchToProps = dispatch => ({
  logoutAction: bindActionCreators(logoutAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
