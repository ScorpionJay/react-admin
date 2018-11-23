import React from "react";
import {
  // HashRouter as Router,
  // BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logoutAction } from "../Login/action";
import { Popover, Icon } from "antd";

import Router from "../../utils/router";

import Loadable from "react-loadable";

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
                    <NavLink to={`${match.url}` + item.link}>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        {/* <div
          onClick={() => {
            logoutAction();
            history.replace("/login");
          }}
        >
          Logout
        </div> */}

        <Popover
          overlayClassName="home_profile_popover"
          placement="bottom"
          content={
            <ul>
              <li>
                <a onClick={() => history.push(`/profile`)}>Profile</a>
              </li>
              <li
                onClick={() => {
                  logoutAction();
                  history.replace(`/login`);
                }}
              >
                Logout
              </li>
            </ul>
          }
          trigger="click"
        >
          <div style={{ marginRight: 45 }} className="home_account">
            <Icon type="user" style={{ marginRight: 10 }} />
            <span>Jay</span>
          </div>
        </Popover>
      </header>

      {/* content */}
      <main>
        <Switch>
          {/* <Route exact path={`${match.url}/`} component={Home} /> */}
          <Route path={`${match.url}music`} component={Music} />
          <Route path={`${match.url}system`} component={System} />
          <Route path={`${match.url}chart`} component={Chart} />
          <Redirect to={{ pathname: `${match.url}system` }} />
        </Switch>
      </main>
    </React.Fragment>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
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
