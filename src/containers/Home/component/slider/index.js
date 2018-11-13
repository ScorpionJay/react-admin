import React, { Component } from "react";
import "./style";
import { Carousel } from "antd";
const Slider = () => (
  <Carousel>
    {[1, 2, 3, 4, 5, 6].map(item => (
      <div key={item}>
        <h3>{item}</h3>
      </div>
    ))}
  </Carousel>
);

export default Slider;
