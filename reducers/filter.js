const filterReducer = (state = "-1", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;

    default:
      return state;
  }
};
export default filterReducer;
