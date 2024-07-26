import React from "react";
import "../css/header.css";
import { Link, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../util/localStorage.js";

export default function Header() {
  const navigate = useNavigate();
  const userInfo = getUser();
  const handleLogout = () => {
    alert("로그아웃되었습니다!!");
    removeUser();
    navigate("/");
  };
  return (
    <div className="header">
      <p className="header-main">
        <p>menu</p>
        <Link to="/">
          <img
            src="/images/character_logo.png"
            alt=""
            className="header-title"
          />
        </Link>
        {userInfo ? (
          <p onClick={handleLogout}>Logout</p>
        ) : (
          <Link to="/login" className="link">
            <p>Login</p>
          </Link>
        )}
      </p>
    </div>
  );
}
