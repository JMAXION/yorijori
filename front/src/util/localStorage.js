import { getCookie, removeCookie } from "./cookies";

export const getUser = () => {
  let userInfo =
    localStorage.getItem("userInfo") && getCookie("x-auth-jwt")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  return userInfo;
};

export const removeUser = () => {
  removeCookie("x-auth-jwt");
  localStorage.clear();
};

export const getTripInfo = () => {
  let selectedTours =
    localStorage.getItem("selectedTours") && getCookie("x-auth-jwt")
      ? JSON.parse(localStorage.getItem("selectedTours"))
      : null;

  console.log("셀렉티드투어-->", selectedTours);

  return selectedTours;
};
