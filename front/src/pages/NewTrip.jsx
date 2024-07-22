import React, { useState } from "react";
import "../css/newtrip.css";
import NewTripMap from "../components/newtrip/NewTripMap";
import NewTripTour from "../components/newtrip/NewTripTour";

export default function NewTrip() {
  const [markers, setMarkers] = useState([]);

  return (
    <div className="newtrip">
      <p>새 여행 추가하기</p>
      <section>
        <NewTripMap markers={markers} />
        <NewTripTour setMarkers={setMarkers} />
      </section>
    </div>
  );
}
