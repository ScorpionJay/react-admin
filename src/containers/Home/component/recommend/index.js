import React, { Component } from "react";
import "./style";
import { Card } from "antd";
const Slider = () => (
  <div style={{ background: "#fff" }}>
    <div style={{ margin: "0 20px", padding: 30 }}>Recommend</div>
    <div
      style={{
        display: "flex",
        overflow: "auto"
      }}
    >
      {[1, 2, 3, 4].map(item => (
        <Card
          key={item}
          title="Card title"
          bordered={false}
          style={{ width: 300, margin: "0 30px", background: "#ECECEC" }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      ))}
    </div>
  </div>
);

export default Slider;
