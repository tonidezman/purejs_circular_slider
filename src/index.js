'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import './index.scss';

import * as CONSTANTS from "./constants";

class CircularSlider {

  constructor(container, options = {}) {
    if (!this._valid_container(container)) throw new Error(CONSTANTS.ERROR_MSG);

    this.options = Object.assign({
      color: "#333",
      min: 0,
      max: 100,
      step: 0.1,
      radius: 360,
      label: "My default label"
    }, options);

    this.containerId = this._removeHshFromId(container);
    this.svgId = `${this.containerId}-svg`;
    this.color = this.options.color;
    this.min = this.options.min;
    this.max = this.options.max;
    this.step = this.options.step;
    this. radius = this.options.radius;
    this.label = this.options.label;
    this.length = CONSTANTS.LENGTH;
    this.sliderWidth = CONSTANTS.SLIDER_WIDTH;
    this.radius = this.length / 2;
    this.direction = 1;
    this.pathX = this._computeX();
    this.pathY = this._computeY();

    this._initialize_svg_tag();
    this._initialize_slider();
  }

  _computeX() {
    // maybe use Math.cos
    return 0;
  }

  _computeY() {
    // maybe use Math.sin
    return 400;
  }

  _valid_container(container) {
    return container && container.startsWith("#");
  }

  _removeHshFromId(container) {
    return container.slice(1, container.length);
  }

  _initialize_svg_tag() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null,"id", this.svgId);
    svg.setAttributeNS(null,"width", this.length);
    svg.setAttributeNS(null,"height", this.length);

    const container = document.getElementById(this.containerId);
    container.appendChild(svg);
  }

  _initialize_slider() {
    const svgTag = document.getElementById(this.svgId);
    console.log(this.svgId);
    const svgCircle = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = this._generate_circle();
    svgCircle.setAttributeNS(null,"d", d);
    svgCircle.setAttributeNS(null,"stroke", this.color);
    svgCircle.setAttributeNS(null,"stroke-width", this.sliderWidth);
    svgCircle.setAttributeNS(null,"fill", "none");
    svgTag.appendChild(svgCircle);
  }

  _generate_circle() {
    let d = [];
    d.push(`M${this.radius}`);
    d.push(this.length - this.sliderWidth);
    d.push(`A${this.radius}`);
    d.push(this.radius);
    d.push(0);
    d.push(this.direction);
    d.push(0);
    d.push(this.pathX);
    d.push(this.pathY);
    console.log(d);
    return d.join(" ");
  }
}


let firstSlider = new CircularSlider("#slider1");
