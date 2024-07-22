import axios from "axios";
import React, { useEffect, useState } from "react";
import TourDetailModal from "./TourDetailModal";

export default function HomeTourSuggest() {
  const [tourlist, setTourlist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [tourIndex, setTourIndex] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get("/data/jejutour.json")
      .then((res) => {
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 12); // 최대 12개의 항목 선택
        setTourlist(selected);
      })
      .catch((error) => console.log(error));
  }, []);

  const rows = [];
  for (let i = 0; i < tourlist.length; i += 2) {
    rows.push(tourlist.slice(i, i + 2));
  }

  return (
    <div>
      <section className="home-suggest">
        <p>추천 여행지 목록</p>
        <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
          {rows.map((tours, rowIndex) => (
            <ul className="tourlist-suggest" key={rowIndex}>
              {tours.map((tour, tourSubIndex) => (
                <li
                  className="tourlist-suggest-detail"
                  key={`${rowIndex}-${tourSubIndex}`}
                >
                  <div>
                    <img
                      src={tour.img}
                      alt=""
                      className="tourlist-suggest-image"
                    />
                    <p>{tour.name}</p>
                  </div>
                  <p
                    onClick={() => {
                      setTourIndex(rowIndex * 2 + tourSubIndex); // 올바른 인덱스를 설정
                      openModal();
                    }}
                  >
                    상세보기
                  </p>
                </li>
              ))}
            </ul>
          ))}
          {isModalOpen && tourlist[tourIndex] && (
            <TourDetailModal
              onClose={closeModal}
              places={tourlist[tourIndex]}
            />
          )}
        </div>
      </section>
    </div>
  );
}
