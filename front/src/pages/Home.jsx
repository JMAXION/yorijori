import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/home.css";
import HomeTour from "../components/home/HomeTour";
import HomeTourSuggest from "../components/home/HomeTourSuggest";

export default function Home() {
  return (
    <div className="home">
      <HomeTour />
      <HomeTourSuggest />
    </div>
  );
}
