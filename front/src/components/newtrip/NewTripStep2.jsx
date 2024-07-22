import React, { useState, useEffect } from "react";

export default function NewTripStep2({ onNext }) {
  const [selectedTours, setSelectedTours] = useState([]);
  const [startingPoint, setStartingPoint] = useState("");
  const [tripName, setTripName] = useState("");

  useEffect(() => {
    const savedTours = localStorage.getItem("selectedTours");
    if (savedTours) {
      console.log("로드된 투어:", JSON.parse(savedTours));
      setSelectedTours(JSON.parse(savedTours));
    }
  }, []);

  const handleStartingPointChange = (e) => {
    const selectedTourId = e.target.value;
    console.log("선택된 값:", selectedTourId);
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

    // selectedTour 찾기
    const selectedTour = selectedTours.find((tour) => {
      console.log(`투어 ID: ${tour.id}, 선택된 시작지: ${startingPoint}`);
      return tour.id === startingPoint; // 필요시 parseInt 사용
    });

    console.log("선택된 투어:", selectedTour);

    if (!selectedTour) {
      alert("유효한 시작지를 선택해주세요.");
      return;
    }

    // 다음 단계로 이동하는 로직 추가
    onNext({ tripName, startingPoint: selectedTour.name });
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
