import todosReducer from "./todos";
import filterReducer from "./filter";
import serverDomain from "./serverDomain";
import {combineReducers} from 'redux';

const AllReducers = combineReducers({
  todos: todosReducer, 
  filter: filterReducer,
  serverDomain: serverDomain
})

export default AllReducers;