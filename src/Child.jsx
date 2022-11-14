import React, { Component } from 'react'
import './css/style.css'
var classNames = require('classnames');
export default class Child extends Component {
    constructor(){
        super();
        this.state={
            x:true,
            y:true
        }
    }
  render() {
    let {x,y}=this.state;

    let className=classNames(["three",{two:x},{one:y}]);
    return (
      <div>
        <h3>Child组件</h3>
        <div className={className}>知识改变命运</div>
      </div>
    )
  }
}
