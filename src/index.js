'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import './index.scss';

import * as CONSTANTS from "./constants";

class CircularSlider {

  // TODO extract argument default values to constants
  constructor(container, options = {}) {
    if (!this._valid_container(container)) throw new Error(CONSTANTS.ERROR_MSG);

    this.options = Object.assign({
      color: "pink",
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
    this.width = CONSTANTS.WIDTH;
    this.height = CONSTANTS.HEIGHT;

    this._initialize_svg_tag();
    this._initialize_slider();
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
    svg.setAttributeNS(null,"width", this.width);
    svg.setAttributeNS(null,"height", this.height);

    const container = document.getElementById(this.containerId);
    container.appendChild(svg);
  }

  _initialize_slider() {
    const svgTag = document.getElementById(this.svgId);
    console.log(this.svgId);
    const svgCircle = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = "M200 0 A100 100 0 0 1 0 400 0";
    svgCircle.setAttributeNS(null,"d", d);
    svgCircle.setAttributeNS(null,"stroke", this.color);
    svgCircle.setAttributeNS(null,"stroke-width", "20px");
    svgCircle.setAttributeNS(null,"fill", "none");
    svgTag.appendChild(svgCircle);
  }
}


let firstSlider = new CircularSlider("#slider1");
