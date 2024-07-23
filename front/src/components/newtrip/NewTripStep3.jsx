import React, { useEffect, useRef, useState } from "react";
const { kakao } = window;

// Define the haversineDistance function
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
}) {
  const mapRef = useRef(null);
  const [orderedTours, setOrderedTours] = useState([]);

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

    const linePath = orderedPoints.map((point) => point);
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#FF0000",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });

    polyline.setMap(map);

    orderedPoints.forEach((point, index) => {
      new kakao.maps.Marker({
        map: map,
        position: point,
        title: selectedTours.find(
          (tour) =>
            tour.latitude === point.getLat() &&
            tour.longitude === point.getLng()
        )?.name,
      });
    });
  }, [selectedTours, startingPoint]);

  return (
    <div className="newtrip">
      <h2>{tripName} 여행 경로</h2>
      <ol>
        {orderedTours.map((tour, index) => (
          <li key={index}>{`${index + 1}. ${tour.name}`}</li>
        ))}
      </ol>
      <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}
