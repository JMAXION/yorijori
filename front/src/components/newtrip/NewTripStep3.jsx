import React from "react";

export default function NewTripStep3({ tripName, startingPoint }) {
  return (
    <div className="newtrip">
      <h2>여행 정보 확인</h2>
      <p>여행 이름: {tripName}</p>
      <p>시작 지점: {startingPoint}</p>
    </div>
  );
}
