import logo from './logo.svg';
import produce from "immer";
import './App.css';
import { TodoList } from './TodoList';
import { createContext, useEffect, useReducer } from 'react';
import axios from "axios";


const initialState = {
  loading: false,
  todos: [],
  error: null
}

const actions = {
  GET_TODO_LOADING: "GET_TODO_LOADING",
  GET_TODO_LOADED: "GET_TODO_LOADED",
  GET_TODO_FAILED: "GET_TODO_FAILED",
  GET_TODO_ADD: "GET_TODO_ADD",
}

const todoReducer = (state=initialState, action) => {
  switch(action.type) {
    case actions.GET_TODO_LOADING: return produce(state, (draftState) => {
      draftState.loading = true;
    });
    case actions.GET_TODO_LOADED: return produce(state, (draftState) => {
      draftState.loading = false;
      draftState.todos = action.payload;
    });
    case actions.GET_TODO_FAILED: return produce(state, (draftState) => {
      draftState.loading = false;
      draftState.error = action.payload;
    });

    case actions.GET_TODO_ADD: return produce(state, (draftState) => {
      draftState.todos.push(action.payload);
    })
    default: return state;
  }
}

// const getTodo = async(dispatch) => {
//   try {
//  dispatch ({type: actions.GET_TODO_LOADING});
//  const response = await axios.get("https://dummyjson.com/todos");
//  dispatch({type:actions.GET_TODO_LOADED, payload: response.data.todos});
//   }
//   catch(error) {
//     dispatch({type:actions.GET_TODO_FAILED, payload:error});
//   }

// }

export const todoListContext = createContext();
function App() {
  const[todoState, dispatch]  = useReducer(todoReducer, initialState);
  // useEffect(()=>{
  //  getTodo(dispatch);

  // }, []);

  const value = {
    todoStateList:todoState,
    addTodoitem: (item)=> {
      console.log("value of the item", item);
      dispatch({type: actions.GET_TODO_ADD, payload:item})
    }
  };

  return (
    <>
    <todoListContext.Provider value={value}>
    <TodoList />
    </todoListContext.Provider>
    </>
  );
}

export default App;
