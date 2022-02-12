import React from "react";

export default function Navbar() {
  return (
      <header className="navBar">
        <div>
          <a href="#" className="logo">Amazon</a>
        </div>
        <div className="signSec">
          <a href="">Cart</a>
          <a href="">SignIn</a>
        </div>
      </header>
  );
}
