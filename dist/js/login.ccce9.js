(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{958:function(e,t,r){"use strict";r.r(t);var a=r(1),n=r.n(a),o=r(945),s=(r(959),r(251));t.default=class extends n.a.Component{constructor(...e){var t;return t=super(...e),this.state={redirectToReferrer:!1},this.login=(()=>{s.a.authenticate(()=>{this.setState({redirectToReferrer:!0})})}),t}render(){const{from:e}=this.props.location.state||{from:{pathname:"/"}},{redirectToReferrer:t}=this.state;return t?n.a.createElement(o.a,{to:e}):n.a.createElement("div",{className:"login"},n.a.createElement("div",{className:"login-form"},n.a.createElement("p",null,"You must log in to view the page at ",e.pathname),n.a.createElement("button",{onClick:this.login},"Login")))}}}}]);