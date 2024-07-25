import axios from "axios";
import React, { useEffect, useState } from "react";
import TourDetailModal from "../home/TourDetailModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export default function NewTripTour({
  setMarkers,
  onNext,
  cartList,
  setCartList,
}) {
  const [tourlist, setTourlist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const url = "http://localhost:8080/map";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = (tour) => {
    if (cartList.some((item) => item.id === tour.id)) {
      alert("이미 장바구니에 담긴 여행지입니다");
      return;
    }

    setCartList((prevCartList) => [...prevCartList, tour]);
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { latitude: tour.latitude, longitude: tour.longitude },
    ]);
  };

  const removeFromCart = (tourToRemove) => {
    setCartList((prevCartList) =>
      prevCartList.filter((tour) => tour.id !== tourToRemove.id)
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
    axios({ method: "post", url: url })
      .then((res) => {
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice();
        setTourlist(selected);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleComplete = () => {
    console.log("카트 리스트:", cartList);

    if (cartList.length === 0) {
      alert("장바구니가 비어있습니다. 여행지를 선택해주세요.");
      return;
    }

    // 로컬 스토리지에 선택된 여행지 저장
    try {
      localStorage.setItem("selectedTours", JSON.stringify(cartList));
      alert("여행 계획이 성공적으로 저장되었습니다!");
      onNext(); // 다음 단계로 이동
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("여행 계획 저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
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
            {tourlist &&
              tourlist.length > 0 &&
              rows.map((tours, rowIndex) => (
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
                            setTourIndex(rowIndex * 2 + tourSubIndex);
                            openModal();
                          }}
                        />
                        <p className="newtrip-suggest-details">
                          <p>{tour.name}</p>
                          <p
                            onClick={() => {
                              setTourIndex(rowIndex * 2 + tourSubIndex);
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
        <section className="newtrip-cart">
          <p>장바구니</p>
          <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
            <ul className="newtrip-cart-list">
              {cartList &&
                cartList.length > 0 &&
                cartList.map((tour, index) => (
                  <li className="newtrip-cart-detail" key={index}>
                    <div>
                      <FontAwesomeIcon
                        icon={faCircleMinus}
                        className="fa-circle-minus-icon"
                        onClick={() => removeFromCart(tour)}
                      />
                      <img
                        src={tour.img}
                        alt=""
                        className="newtrip-image"
                        onClick={() => {
                          setTourIndex(
                            tourlist.findIndex((t) => t.id === tour.id)
                          );
                          openModal();
                        }}
                      />
                      <p className="newtrip-cart-details">
                        <p>{tour.name}</p>
                        <p
                          onClick={() => {
                            setTourIndex(
                              tourlist.findIndex((t) => t.id === tour.id)
                            );
                            openModal();
                          }}
                          className="newtrip-cart-button"
                        >
                          상세보기
                        </p>
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </div>
      <p className="newtriptourbutton">
        <button onClick={handleComplete} className="newtriptour-button">
          완료
        </button>
      </p>
    </div>
  );
}
