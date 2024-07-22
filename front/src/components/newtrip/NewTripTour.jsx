import axios from "axios";
import React, { useEffect, useState } from "react";
import TourDetailModal from "../home/TourDetailModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export default function NewTripTour({ setMarkers }) {
  const [tourlist, setTourlist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [tourIndex, setTourIndex] = useState(0);
  const [cartList, setCartList] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };

  const addToCart = (tour) => {
    setCartList((prevCartList) => [...prevCartList, tour]);
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { latitude: tour.latitude, longitude: tour.longitude },
    ]);
  };

  const removeFromCart = (tourToRemove) => {
    setCartList((prevCartList) =>
      prevCartList.filter((tour) => tour !== tourToRemove)
    );
    setMarkers((prevMarkers) =>
      prevMarkers.filter(
        (marker) =>
          marker.latitude !== tourToRemove.latitude &&
          marker.longitude !== tourToRemove.longitude
      )
    );
  };

  useEffect(() => {
    axios
      .get("/data/jejutour.json")
      .then((res) => {
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(); // 최대 12개의 항목 선택
        setTourlist(selected);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleComplete = () => {
    axios
      .post("/api/submitTours", cartList)
      .then((response) => {
        console.log("성공적으로 전송되었습니다.", response.data);
      })
      .catch((error) => {
        console.error("전송 중 오류가 발생했습니다.", error);
      });
  };

  const rows = [];
  for (let i = 0; i < tourlist.length; i += 2) {
    rows.push(tourlist.slice(i, i + 2));
  }

  return (
    <div>
      <div className="newtrip-lists">
        <section className="newtrip-suggests">
          <p>여행지</p>
          <div
            style={{ maxHeight: "400px", overflowY: "scroll" }}
            className="newtrip-list"
          >
            {rows.map((tours, rowIndex) => (
              <ul className="newtrip-suggest" key={rowIndex}>
                {tours.map((tour, tourSubIndex) => (
                  <li
                    className="newtrip-suggest-detail"
                    key={`${rowIndex}-${tourSubIndex}`}
                  >
                    <div>
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        className="fa-circle-plus-icon"
                        onClick={() => addToCart(tour)}
                      />
                      <img
                        src={tour.img}
                        alt=""
                        className="newtrip-image"
                        onClick={() => {
                          setTourIndex(rowIndex * 2 + tourSubIndex); // 올바른 인덱스를 설정
                          openModal();
                        }}
                      />
                      <p className="newtrip-suggest-details">
                        <p>{tour.name}</p>
                        <p
                          onClick={() => {
                            setTourIndex(rowIndex * 2 + tourSubIndex); // 올바른 인덱스를 설정
                            openModal();
                          }}
                          className="newtrip-suggest-button"
                        >
                          상세보기
                        </p>
                      </p>
                    </div>
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
        <section>
          <p>장바구니 목록</p>
          <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
            {cartList.length > 0 ? (
              cartList.map((tour, index) => (
                <div key={index} className="cart-item">
                  <FontAwesomeIcon
                    icon={faCircleMinus}
                    onClick={() => removeFromCart(tour)}
                  />
                  <img src={tour.img} alt="" className="cart-item-image" />
                  <p>{tour.name}</p>
                </div>
              ))
            ) : (
              <p>장바구니가 비어 있습니다.</p>
            )}
          </div>
          <button onClick={handleComplete}>완료</button>
        </section>
      </div>
    </div>
  );
}
