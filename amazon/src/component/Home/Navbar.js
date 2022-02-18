import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"))?.length;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

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
            <ShoppingCartOutlined style={{ fontSize: 40, color: "#ff9900" }} />
          </Badge>
        </Link>
        <Link to="/signin">
          <Avatar
            size={40}
            style={{ backgroundColor: "#fff", verticalAlign: "middle" }}
          >
            {userInfo ? (
              <span style={{ color: "#ff9900" }}>
                {userInfo.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <UserOutlined style={{ fontSize: 25, 'color': "#ff9900" }} />
            )}
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
