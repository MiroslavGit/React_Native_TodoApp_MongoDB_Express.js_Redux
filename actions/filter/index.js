const setFilter = (newFilter) => {
  return {
    type: "SET_FILTER",
    payload: newFilter,
  };
};

export { setFilter };
