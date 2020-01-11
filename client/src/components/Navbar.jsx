import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div class="ui attached stackable menu">
      <div class="ui container">
        <Link to="/" class="item">
          <i class="home icon"></i> Home
        </Link>

        <Link to="/register" class="item">
          <i class="grid layout icon"></i> Register
        </Link>
        <Link to="/login" class="item">
          <i class="mail icon"></i> Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
