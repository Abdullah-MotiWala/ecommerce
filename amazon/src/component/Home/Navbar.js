import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  let cartItems = JSON.parse(localStorage.getItem("cartItems"))?.length;
  return (
    <header className="navBar">
      <div>
        <Link to="#" className="logo">
          Amazon
        </Link>
      </div>
      <div className="signSec">
        <Link to="">
          <Badge count={cartItems} offset={[-5, 8]} size={"small"}>
            <ShoppingCartOutlined style={{ fontSize: 50, color: "#ff9900" }} />
          </Badge>
        </Link>
        <Link to="">SignIn</Link>
      </div>
    </header>
  );
}
