export const setLocalStorage = (tempData) => {
  if (!localStorage.getItem("employees")) {
    localStorage.setItem(
      "employees",
      JSON.stringify({
        data: tempData,
        pageInfo: { page: 1, limit: 20 },
      })
    );
  }
};
export const paginatedData = (page, limit) => {
  const prevData = JSON.parse(localStorage.getItem("employees")).data;
  localStorage.setItem(
    "employees",
    JSON.stringify({
      data: prevData,
      pageInfo: { page: page + 1, limit },
    })
  );
  return {
    data: JSON.parse(localStorage.getItem("employees")).data.slice(
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

export const deleteFromLocalStorage = (id) => {
  const allData = JSON.parse(localStorage.getItem("employees")).data;
  const res = allData.filter((e) => e.id !== id);
  localStorage.setItem(
    "employees",
    JSON.stringify({ data: res, pageInfo: allData.pageInfo })
  );
};

export const localStorageDataSize = () =>
  JSON.parse(localStorage.getItem("employees")).data.length;
