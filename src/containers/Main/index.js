import React from "react";
import {
  // HashRouter as Router,
  // BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";

import Router from "../../utils/router";

// import TableComponent from "../TableComponent";
// import Table from "../Table";
// import Demo from "../demo";
// import Banner from "../Banner";
// import Chart from "../Chart";
// import Upload from "../Upload";
// import Edit1 from "../Edit";
// import Edit from "../Edit/index2.js";
// import Edit4 from "../Edit/index5.js";
// import Edit from "./Edit";

import { LocaleProvider } from "antd";

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

const Main = ({ match, history }) => (
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

        <div
          onClick={() => {
            sessionStorage.removeItem("token");
            history.replace("/login");
          }}
        >
          Logout
        </div>
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

export default Main;
