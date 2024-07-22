import React, { useState } from "react";
import NewTripMap from "./NewTripMap";
import NewTripTour from "./NewTripTour";

export default function NewTripStep1({
  onNext,
  setMarkers,
  cartList,
  setCartList,
}) {
  const [markers, setMarkersState] = useState([]);

  return (
    <div className="newtrip">
      <p>새 여행 추가하기</p>
      <section>
        <NewTripMap markers={markers} />
        <NewTripTour
          setMarkers={(newMarkers) => {
            setMarkersState(newMarkers);
            setMarkers(newMarkers); // 상위 컴포넌트에도 업데이트
          }}
          cartList={cartList}
          setCartList={setCartList}
          onNext={onNext}
          markers={markers}
        />
      </section>
    </div>
  );
}
