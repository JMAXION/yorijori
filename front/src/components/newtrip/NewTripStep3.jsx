import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../util/localStorage";
const { kakao } = window;

const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;

  const lat1 = coords1.getLat();
  const lon1 = coords1.getLng();
  const lat2 = coords2.getLat();
  const lon2 = coords2.getLng();

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export default function NewTripStep3({
  tripName,
  startingPoint,
  selectedTours = [],
  startTime = "09:00", // 출발시간 추가
}) {
  const userInfo = getUser();
  const mapRef = useRef(null);
  const [orderedTours, setOrderedTours] = useState([]);
  const [splitTours, setSplitTours] = useState({}); // 날짜별로 나눠진 여행지

  useEffect(() => {
    if (!kakao || !kakao.maps) {
      console.error("카카오 지도 API를 로드할 수 없습니다.");
      return;
    }

    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(
        selectedTours[0]?.latitude || 33.450701,
        selectedTours[0]?.longitude || 126.570667
      ),
      level: 10,
    };

    const map = new kakao.maps.Map(container, options);

    if (selectedTours.length === 0) return;

    const startTour = selectedTours.find((tour) => tour.name === startingPoint);
    if (!startTour) return;

    const points = selectedTours.map((tour) => ({
      ...tour,
      point: new kakao.maps.LatLng(tour.latitude, tour.longitude),
    }));

    const startPoint = new kakao.maps.LatLng(
      startTour.latitude,
      startTour.longitude
    );
    const orderedPoints = [startPoint];
    const orderedToursList = [startTour];

    let remainingPoints = points.filter((tour) => tour.name !== startingPoint);

    while (remainingPoints.length > 0) {
      let nearestPoint = null;
      let nearestIndex = -1;
      let minDistance = Infinity;

      remainingPoints.forEach((tour, index) => {
        const distance = haversineDistance(
          orderedPoints[orderedPoints.length - 1],
          tour.point
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestPoint = tour;
          nearestIndex = index;
        }
      });

      if (nearestPoint) {
        orderedPoints.push(nearestPoint.point);
        orderedToursList.push(nearestPoint);
        remainingPoints.splice(nearestIndex, 1);
      }
    }

    setOrderedTours(orderedToursList);

    // 시간 계산 로직 추가
    const splitToursByDay = calculateTourTimes(orderedToursList, startTime);
    setSplitTours(splitToursByDay);

    // 각 날별로 경로와 색깔을 나누어 지도에 표시
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"]; // 필요한 만큼 색깔 추가
    Object.keys(splitToursByDay).forEach((day, index) => {
      const dayTours = splitToursByDay[day];
      const linePath = dayTours.map(
        (tour) => new kakao.maps.LatLng(tour.latitude, tour.longitude)
      );
      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: colors[index % colors.length], // 색깔 변경
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });

      polyline.setMap(map);

      dayTours.forEach((tour) => {
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(tour.latitude, tour.longitude),
          title: tour.name,
        });
      });
    });
  }, [selectedTours, startingPoint, startTime]);

  const calculateTourTimes = (tours, startTime) => {
    const startDate = new Date();
    const [startHour, startMinute] = startTime.split(":").map(Number);
    startDate.setHours(startHour, startMinute, 0, 0);

    const splitToursByDay = {};
    let currentDate = new Date(startDate);
    let currentDay = 1;
    let currentTime = new Date(startDate);

    splitToursByDay[`day${currentDay}`] = [];

    tours.forEach((tour, index) => {
      const stayDuration = tour.stayDuration || 60; // 기본 머무는 시간 60분
      const travelTime =
        index === 0 ? 0 : calculateTravelTime(tours[index - 1], tour);

      currentTime.setMinutes(currentTime.getMinutes() + travelTime);

      if (currentTime.getHours() >= 20) {
        currentDay += 1;
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(9, 0, 0, 0); // 다음날 9시로 초기화
        currentTime = new Date(currentDate);
        splitToursByDay[`day${currentDay}`] = [];
      }

      splitToursByDay[`day${currentDay}`].push({
        ...tour,
        startTime: new Date(currentTime),
      });

      currentTime.setMinutes(currentTime.getMinutes() + stayDuration);
    });

    return splitToursByDay;
  };

  const calculateTravelTime = (tour1, tour2) => {
    const distance = haversineDistance(
      new kakao.maps.LatLng(tour1.latitude, tour1.longitude),
      new kakao.maps.LatLng(tour2.latitude, tour2.longitude)
    );
    const speed = 50; // 이동 속도 (km/h), 필요 시 조정
    return (distance / speed) * 60; // 분 단위로 반환
  };

  return (
    <div className="new-trip">
      <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
      <div>
        <h1>{userInfo.userId} 님의 여행계획</h1>
        <h2>여행명 - {tripName}</h2>
        {Object.keys(splitTours).map((day) => (
          <div key={day}>
            <h3>{day}</h3>
            <ul>
              {splitTours[day].map((tour, index) => (
                <li key={index}>
                  {tour.name} - {tour.startTime.toLocaleTimeString()} 출발
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
