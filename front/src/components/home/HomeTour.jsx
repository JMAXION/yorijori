import React from "react";
import { useNavigate } from "react-router-dom";
import { getTripInfo, getUser, removeUser } from "../../util/localStorage.js";

export default function HomeTour() {
  const navigate = useNavigate();
  const userInfo = getUser();
  const selectedTours = getTripInfo([]);
  console.log("로컬스토리지로 받아오는 투어인포 ->", selectedTours);

  console.log("유저인포-->", userInfo);
  return (
    <div>
      <section className="tourlist">
        {userInfo ? (
          <p>{userInfo.userId}님의 여행지 목록</p>
        ) : (
          <p>나의 여행지 목록</p>
        )}

        <ul className="hometour-list-container">
          {selectedTours && selectedTours.length > 0 ? (
            selectedTours.map((tour) => (
              <li key={tour.id}>
                <img src={tour.img} alt="" className="hometour-list-image" />
                <p>{tour.name}</p>
              </li>
            ))
          ) : (
            <p>여행 목록이 없습니다.</p>
          )}
        </ul>
        <p className="tourlistbutton">
          <button
            onClick={() => navigate("/newtrip")}
            className="tourlist-button"
          >
            새 여행 추가하기
          </button>
        </p>
      </section>
    </div>
  );
}
