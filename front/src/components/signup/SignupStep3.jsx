import { Link, useNavigate } from "react-router-dom";

export default function SignupStep3() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup">
      <h1 className="signup-congrat">CONGRATULATION!</h1>
      <img
        src="https://cdn.tourtoctoc.com/news/photo/202305/520_2742_5617.jpg"
        className="signup-congrat-image"
      />
      <p className="signup-congrats">회원가입에 성공하셨습니다.</p>

      <button
        type="button"
        onClick={handleLogin}
        className="signup-login-button"
      >
        로그인
      </button>
    </div>
  );
}
