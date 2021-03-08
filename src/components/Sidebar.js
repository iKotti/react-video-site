import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="border-right h-100 sidebar">
          <div className="sidebar-heading">
            <Link to="/">
              <img src={Logo} alt="Logo" width="100%"></img>
            </Link>
          </div>
          <div className="list-group">
            <Link to="/" className="list-group-item bg-light">
              <i className="fas fa-play"></i>VİDEOLAR
            </Link>
            <Link to="/wishlist" className="list-group-item bg-light">
              <i className="fas fa-heart"></i>BEĞENDİKLERİM
            </Link>
            <Link to="/add-video" className="list-group-item bg-light">
              <i className="fas fa-plus"></i>VİDEO EKLE
            </Link>
            <Link to="/github" className="list-group-item bg-light">
              <i className="fab fa-github"></i>GITHUB
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
