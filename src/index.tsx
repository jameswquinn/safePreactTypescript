
import Router from 'preact-router';
import { h, render } from 'preact';
/** @jsx h */
import App from './App';
import './index.css';

render(<App />, document.body, document.body.querySelector('main'));

/*
import "lazysizes";
//import "./index.css";
import { html, render } from "lit-html";
// import a plugin
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const responsiveImage = require("./img/three.jpg?min=320,max=1400,steps=6");

render(
  html`
    <div class="wrapper">
      <h1>Title</h1>
      <img
        data-sizes="auto"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1880 1140'%3E%3C/svg%3E"
        data-srcset="${responsiveImage.srcSet}"
        class="lazyload"
      />
      <h2>meta tag</h2>
    </div>
  `,
  document.body
);
*/