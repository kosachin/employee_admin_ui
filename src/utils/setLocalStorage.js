import tempData from "./tempData";
export const setLocalStorage = () => {
  if (!localStorage.getItem("employees")) {
    console.log("here");
    localStorage.setItem("employees", JSON.stringify(tempData));
  }
//   console.log("here");
};
