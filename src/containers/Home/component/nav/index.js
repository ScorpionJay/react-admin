import React, { Component } from "react";
import "./style";
import { Card } from "antd";
const Slider = () => (
  <div
    style={{
      background: "#ECECEC",
      padding: "30px",
      display: "flex",
      overflow: "auto"
    }}
  >
    {[1, 2, 3, 4].map(item => (
      <Card
        key={item}
        title="Card title"
        bordered={false}
        style={{ width: 300, margin: "0 30px" }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    ))}
  </div>
);

export default Slider;
