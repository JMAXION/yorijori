import React from "react";
import "../css/header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img src="/images/character_logo.png" alt="" className="header-title" />
      </Link>
    </div>
  );
}
