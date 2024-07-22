import React, { useEffect } from "react";
const { kakao } = window;

export default function NewTripMap({ markers }) {
  useEffect(() => {
    // 지도 생성
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(33.3666, 126.53333), // 지도의 중심좌표
      level: 9, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성

    // 마커들 생성
    markers.forEach((markerInfo) => {
      const markerPosition = new kakao.maps.LatLng(
        markerInfo.latitude,
        markerInfo.longitude
      );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);

      // 인포윈도우 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${
          markerInfo.content || "HELLO"
        }</div>`, // 인포윈도우에 표시할 내용
      });

      // 마커에 클릭 이벤트 추가
      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker); // 마커를 클릭하면 인포윈도우가 열리도록 설정
      });
    });
  }, [markers]);

  return (
    <div
      id="map"
      style={{ width: "1000px", height: "500px", zIndex: 1 }}
      className="tourdetail-map"
    ></div>
  );
}
