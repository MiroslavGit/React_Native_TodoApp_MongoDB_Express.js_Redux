const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];

    case "LOAD_TODOS":
      return action.payload;

    case "DELETE_TODO":
      let newList = [...state];
      return newList.filter((item) => item._id !== action.payload);

    case "UPDATE_TODO_STATE":
      return state.map((item) =>
        item._id === action.itemId ? { ...item, state: action.newState } : item
      );

    default:
      return state;
  }
};
export default todosReducer;
