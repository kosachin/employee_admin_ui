// import tempData from "./tempData";
export const setLocalStorage = (tempData, currStart, limit) => {
  if (!localStorage.getItem("employees") && !localStorage.getItem("pageInfo")) {
    localStorage.setItem("employees", JSON.stringify(tempData));
    localStorage.setItem(
      "pageInfo",
      JSON.stringify({ start: currStart, limit: limit })
    );
  }
  const info = JSON.parse(localStorage.getItem("pageInfo"));
  // updatePageInfo(info);
};
// export function* paginatedData(page, currStart, limit) {
//   while (true) {
//     yield {
//       currStart: limit * page,
//       data: JSON.parse(localStorage.getItem("employees")).slice(
//         currStart + limit,
//         currStart + 2 * limit
//       ),
//     };
//   }
// }
export const paginatedData = (page, currStart, limit) => {
  localStorage.setItem(
    "pageInfo",
    JSON.stringify({
      start: limit * page,
      limit: limit * page + limit,
    })
  );
  return {
    currStart: limit * page,
    data: JSON.parse(localStorage.getItem("employees")).slice(
      page * limit,
      page * limit + limit
    ),
  };
};

export const updateLocalStorage = (localStorageData, payload, id) => {
  const updatedLocalStorageData = localStorageData.map((e) => {
    if (Number(e.id) === Number(id)) {
      return payload;
    }
    return e;
  });
  return updatedLocalStorageData;
};

// export const updatePageInfo = (info) => {
//   const pageInfo = JSON.parse(localStorage.getItem("pageInfo"));
// };

export const localStorageDataSize = () =>
  JSON.parse(localStorage.getItem("employees")).length;
