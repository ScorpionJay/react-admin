/*
 * @Author: jay
 * @Date: 2018-11-13 17:03:39
 * @Last Modified by: jay
 * @Last Modified time: 2018-11-13 17:18:03
 */

import React from "react";
import { Route, NavLink, Redirect, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logoutAction } from "../Login/action";

import Router from "../../utils/router";

import Loadable from "react-loadable";

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ "../Home"),
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

import "./style";

const Nav = [
  { name: "Home", link: "home" },
  { name: "Music", link: "music" },
  { name: "Chart", link: "chart" },
  { name: "System", link: "system" }
];

const fnPrefix = pathname => {
  const url = pathname.split("/");
  return `/${url[1]}/${url[2]}`;
};

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

        <div
          onClick={() => {
            logoutAction();
            history.replace(`${fnPrefix(match.url)}/login`);
          }}
        >
          Logout
        </div>
      </header>

      <main>
        <Switch>
          {/* <Route exact path={`${match.url}/`} component={Home} /> */}
          <Route exact path={`/*/*/home`} component={Home} />
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
