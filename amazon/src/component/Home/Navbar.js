import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Avatar, Badge, Popover } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../redux/actions/authActions";

export default function Navbar() {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(signout());
  };
  let cartItems = JSON.parse(localStorage.getItem("cartItems"))?.length;
  const { userInfo } = useSelector((state) => state.userAuth);
  // const { userInfo } = userSignIn;

  //if user info found so implemnt popover

  const popOverOrNot = () => {
    if (userInfo) {
      return (
        <Popover
          placement="bottom"
          title={"logout"}
          content={<Button onClick={clickHandler}>signout</Button>}
          trigger="click"
        >
          <Avatar
            size={40}
            style={{ backgroundColor: "#fff", verticalAlign: "middle" }}
          >
            <span style={{ color: "#ff9900" }}>
              {userInfo?.name?.charAt(0).toUpperCase()}
            </span>
          </Avatar>
        </Popover>
      );
    }
    return (
      <Link to="/signup">
        <Avatar
          size={40}
          style={{ backgroundColor: "#fff", verticalAlign: "middle" }}
        >
          <UserOutlined style={{ fontSize: 25, color: "#ff9900" }} />
        </Avatar>
      </Link>
    );
  };

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
        <Link to="/signin">{popOverOrNot()}</Link>
      </div>
    </header>
  );
}
