import React, { Component } from "react";
import {Link} from 'react-router-dom'
import Customerheader from './dashboard/customerheader'

export default class FirstPage extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return <div>
        <Customerheader />
    <div className="container">
        <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
                    <Link to='profile' className="site-btn sb-gradients btn-block waves-effect z-depth-0"> Update profile</Link>
                    <Link to='/fpage' className="site-btn sb-gradients btn-block waves-effect z-depth-0"> Do Transaction</Link>
            </div>
        </div>
    </div>
    </div>;
  }
}
