import React, { useState, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as cookie from "../util/cookies.js";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const userIdRef = useRef(null);
  const userPassRef = useRef(null);
  const [formData, setFormData] = useState({ userId: "", userPass: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationCheck()) {
      console.log(formData);
      const url = "http://127.0.0.1:8080/member/login";
      axios({
        method: "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          if (res.data.cnt === 1) {
            console.log("token-->", res.data.token);
            cookie.setCookie("x-auth-jwt", res.data.token);
            const userInfo = jwtDecode(res.data.token);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            alert("로그인 성공!");
            navigate("/");
          } else {
            alert("로그인 실패! 아이디와 비밀번호를 다시 확인하세요!");
            setFormData({ userId: "", userPass: "" });
            userIdRef.current.focus();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const validationCheck = () => {
    let checkFlag = true;
    if (!formData.userId.trim()) {
      alert("아이디를 입력해 주세요");
      userIdRef.current.focus();
      checkFlag = false;
    } else if (!formData.userPass.trim()) {
      alert("패스워드를 입력해주세요");
      userPassRef.current.focus();
      checkFlag = false;
    }
    return checkFlag;
  };
  return (
    <div className="login">
      <p>LOGIN</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <table className="login-section-table">
          <tr className="login-section-table-tr">
            <td>아이디</td>
            <td>
              <input
                type="text"
                name="userId"
                ref={userIdRef}
                value={formData.userId}
                onChange={handleChange}
                className="login-section-input"
              />
            </td>
          </tr>
          <tr className="login-section-table-tr">
            <td>비밀번호</td>
            <td>
              <input
                type="password"
                name="userPass"
                ref={userPassRef}
                value={formData.userPass}
                onChange={handleChange}
                className="login-section-input"
              />
            </td>
          </tr>
        </table>
        <section className="buttons">
          <button type="submit" className="login-button">
            로그인
          </button>
          <Link to="/signup">
            <button type="button" className="login-button signinbutton">
              회원가입
            </button>
          </Link>
        </section>
      </form>
    </div>
  );
}
