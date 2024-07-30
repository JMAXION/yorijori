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
  departureTime,
}) {
  const userInfo = getUser();
  const mapRef = useRef(null);
  const [orderedTours, setOrderedTours] = useState([]);
  const [splitTours, setSplitTours] = useState({});
  console.log("출발시간-->", departureTime);

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

    calculateTourTimes(orderedToursList, departureTime).then(
      (splitToursByDay) => {
        setSplitTours(splitToursByDay);

        const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
        Object.keys(splitToursByDay).forEach((day, index) => {
          const dayTours = splitToursByDay[day];
          const linePath = dayTours.map(
            (tour) => new kakao.maps.LatLng(tour.latitude, tour.longitude)
          );
          const polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: colors[index % colors.length],
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
      }
    );
  }, [selectedTours, startingPoint, departureTime]);

  const calculateTourTimes = async (tours, departureTime) => {
    const startDate = new Date();
    const [departureHour, departureMinute] = (departureTime || "10:00")
      .split(":")
      .map(Number);
    startDate.setHours(departureHour, departureMinute, 0, 0);

    const splitToursByDay = {};
    let currentDate = new Date(startDate);
    let currentDay = 1;
    let currentTime = new Date(startDate);

    splitToursByDay[`day${currentDay}`] = [];

    let morningTours = 0;
    let afternoonTours = 0;
    const maxMorningTours = 3;
    const maxAfternoonTours = 3;

    for (let index = 0; index < tours.length; index++) {
      const tour = tours[index];
      const stayDuration = tour.stayDuration || 60;
      const travelTime =
        index === 0 ? 0 : await calculateTravelTime(tours[index - 1], tour);

      currentTime.setMinutes(currentTime.getMinutes() + travelTime);

      const isAfternoon = currentTime.getHours() >= 12;

      if (
        (isAfternoon && afternoonTours >= maxAfternoonTours) ||
        (!isAfternoon && morningTours >= maxMorningTours) ||
        currentTime.getHours() >= 20
      ) {
        currentDay += 1;
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(9, 0, 0, 0);
        currentTime = new Date(currentDate);
        splitToursByDay[`day${currentDay}`] = [];
        morningTours = 0;
        afternoonTours = 0;
      }

      const arrivalTime = new Date(currentTime);
      currentTime.setMinutes(currentTime.getMinutes() + stayDuration);
      const departureTime = new Date(currentTime);

      splitToursByDay[`day${currentDay}`].push({
        ...tour,
        arrivalTime,
        departureTime,
        travelTime,
      });

      if (isAfternoon) {
        afternoonTours++;
      } else {
        morningTours++;
      }
    }

    const firstDay = splitToursByDay["day1"];
    const totalFirstDayTours =
      departureHour < 12 ? 6 : departureHour < 15 ? 4 : 2;
    splitToursByDay["day1"] = firstDay.slice(0, totalFirstDayTours);

    let remainingTours = firstDay.slice(totalFirstDayTours);
    let dayIndex = 2;
    while (remainingTours.length > 0) {
      if (!splitToursByDay[`day${dayIndex}`]) {
        splitToursByDay[`day${dayIndex}`] = [];
      }
      const toursToAdd = remainingTours.slice(0, 6);
      splitToursByDay[`day${dayIndex}`] = [
        ...splitToursByDay[`day${dayIndex}`],
        ...toursToAdd,
      ];
      remainingTours = remainingTours.slice(6);
      dayIndex++;
    }

    return splitToursByDay;
  };

  const calculateTravelTime = (tour1, tour2) => {
    return new Promise((resolve, reject) => {
      const distance = haversineDistance(
        new kakao.maps.LatLng(tour1.latitude, tour1.longitude),
        new kakao.maps.LatLng(tour2.latitude, tour2.longitude)
      );

      const travelTime = (distance / 50) * 60;
      resolve(travelTime);
    });
  };

  return (
    <div className="newtrip">
      <h2>{tripName}</h2>
      <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
      {Object.keys(splitTours).map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          <ul>
            {splitTours[day].map((tour, index) => (
              <li key={index}>
                {tour.name} - 도착: {tour.arrivalTime.toLocaleTimeString()} -
                출발: {tour.departureTime.toLocaleTimeString()} - 이동 시간:{" "}
                {Math.round(tour.travelTime)}분
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
