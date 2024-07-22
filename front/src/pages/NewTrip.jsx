import React, { useState } from "react";
import "../css/newtrip.css";
import NewTripStep1 from "../components/newtrip/NewTripStep1";
import NewTripStep2 from "../components/newtrip/NewTripStep2";
import NewTripStep3 from "../components/newtrip/NewTripStep3";

export default function NewTrip() {
  const [step, setStep] = useState(1);
  const [cartList, setCartList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [tripData, setTripData] = useState({
    tripName: "",
    startingPoint: "",
  });

  const handleNextStep = (data) => {
    if (data) {
      setTripData((prevData) => ({ ...prevData, ...data }));
    }
    setStep(step + 1);
  };

  return (
    <div>
      {step === 1 && (
        <NewTripStep1
          onNext={handleNextStep}
          setMarkers={setMarkers}
          cartList={cartList}
          setCartList={setCartList}
        />
      )}
      {step === 2 && (
        <NewTripStep2
          markers={markers}
          cartList={cartList}
          onNext={handleNextStep}
        />
      )}
      {step === 3 && (
        <NewTripStep3
          tripName={tripData.tripName}
          startingPoint={tripData.startingPoint}
        />
      )}
    </div>
  );
}
