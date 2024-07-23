import React, { useState, useEffect } from "react";

export default function NewTripStep2({ onNext }) {
  const [selectedTours, setSelectedTours] = useState([]);
  const [startingPoint, setStartingPoint] = useState("");
  const [tripName, setTripName] = useState("");

  useEffect(() => {
    const savedTours = localStorage.getItem("selectedTours");
    if (savedTours) {
      setSelectedTours(JSON.parse(savedTours));
    }
  }, []);

  const handleStartingPointChange = (e) => {
    const selectedTourId = e.target.value;
    setStartingPoint(selectedTourId);
  };

  const handleTripNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleSubmit = () => {
    if (!tripName || !startingPoint) {
      alert("여행 이름과 시작지를 모두 입력해주세요.");
      return;
    }

    const selectedTour = selectedTours.find(
      (tour) => tour.id.toString() === startingPoint
    );

    if (!selectedTour) {
      alert("유효한 시작지를 선택해주세요.");
      return;
    }

    onNext({
      tripName: tripName,
      startingPoint: selectedTour.name,
      selectedTours: selectedTours,
    });
  };

  return (
    <div className="newtrip">
      <p>새 여행 추가하기</p>
      <section>
        <p>계획한 여행의 이름을 정해주세요!</p>
        <input type="text" value={tripName} onChange={handleTripNameChange} />
      </section>
      <section>
        <p>여행의 시작지를 정해주세요!</p>
        <select value={startingPoint} onChange={handleStartingPointChange}>
          <option value="">선택해주세요</option>
          {selectedTours.map((tour) => (
            <option key={tour.id} value={tour.id}>
              {tour.name}
            </option>
          ))}
        </select>
      </section>
      <button onClick={handleSubmit}>확인!</button>
    </div>
  );
}
