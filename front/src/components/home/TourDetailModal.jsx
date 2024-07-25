import React, { useEffect, useRef, useState } from "react";
import TourDetailMap from "./TourDetailMap";

export default function TourDetailModal({ onClose, places }) {
  const modalRef = useRef();
  const [fadeOut, setFadeOut] = useState(false); // 애니메이션
  console.log("placesfrommapcontainermodal", places);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      onClose();
    }, 500);
  }; // 애니메이션

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className={`modal ${fadeOut ? "fade-out" : ""}`}>
        <p>{places.name}</p>
        <p>{places.address}</p>
        <section className="tourlist-modal-detail">
          <img src={places.img} alt="" className="tourlist-modal-image" />
          <TourDetailMap places={places} />
        </section>
        <p>{places.information}</p>
      </div>
    </div>
  );
}
