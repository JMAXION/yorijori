import React, { useState, useRef } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const userIdRef = useRef(null);
  const userPassRef = useRef(null);
  const [formData, setFormData] = useState({ userId: "", userPass: "" });
  return (
    <div className="login">
      <p>LOGIN</p>
      <section className="login-section">
        <table className="login-section-table">
          <tr className="login-section-table-tr">
            <td>아이디</td>
            <td>
              <input type="text" className="login-section-input" />
            </td>
          </tr>
          <tr className="login-section-table-tr">
            <td>비밀번호</td>
            <td>
              <input type="password" className="login-section-input" />
            </td>
          </tr>
        </table>
      </section>
      <section className="buttons">
        <button type="submit" className="login-button">
          로그인
        </button>
        <button type="button" className="login-button signinbutton">
          회원가입
        </button>
      </section>
    </div>
  );
}
