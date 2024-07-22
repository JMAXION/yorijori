import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeTour() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="tourlist">
        <p>나의 여행지 목록</p>
        <ul>
          <li>day1</li>
          <li className="tourlist-set">
            <p className="tourlist-set-number">1</p>
            <img
              src="/images/character_logo.png"
              alt=""
              className="tourlist-set-image"
            />
            <p className="tourlist-set-title">여행지명</p>
          </li>
        </ul>
        <p className="tourlistbutton">
          <button
            onClick={() => navigate("/newtrip")}
            className="tourlist-button"
          >
            {" "}
            새 여행 추가하기
          </button>
        </p>
      </section>
    </div>
  );
}
