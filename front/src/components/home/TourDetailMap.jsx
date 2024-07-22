import React, { useEffect } from "react";
const { kakao } = window;
export default function TourDetailMap({ places }) {
  useEffect(() => {
    const location = {
      latlng: new kakao.maps.LatLng(places.latitude, places.longitude),
    };
    var staticMapContainer = document.getElementById("staticMap"),
      staticMapOption = {
        center: location.latlng,
        level: 3, // 확대 레벨
        marker: [
          {
            position: location.latlng,
            text: places.name, // 마커에 표시될 텍스트
          },
        ],
      };
    new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
  });
  return (
    <div
      id="staticMap"
      style={{ width: "300px", height: "300px", zIndex: 1 }}
      className="tourdetail-map"
    ></div>
  );
}
