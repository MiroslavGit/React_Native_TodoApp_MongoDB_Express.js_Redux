const addTodo = (text) => {
  return {
    type: "ADD_TODO",
    payload: text,
  };
};
const loadTodos = (todos) => {
  return {
    type: "LOAD_TODOS",
    payload: todos,
  };
};
const deleteTodo = (itemId) => {
  return {
    type: "DELETE_TODO",
    payload: itemId,
  };
};
const updateTodoState = (itemId, newState) => {
  return {
    type: "UPDATE_TODO_STATE",
    itemId: itemId,
    newState: newState,
  };
};

export { addTodo, deleteTodo, updateTodoState, loadTodos };
