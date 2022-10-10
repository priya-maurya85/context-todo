import React, { useContext, useRef } from 'react'
import { todoListContext } from './App';

export const TodoList = () => {

const {todoStateList, addTodoitem} = useContext(todoListContext);
const inputRef = useRef();
const handleTodoList = () => {
    addTodoitem(inputRef.current.value);
}

  return (
   <>
   <input ref={inputRef}/>
   <button onClick={handleTodoList}>Add todo </button>
   <ul>
    {todoStateList.todos && todoStateList.todos.map((item) => {
        return <li>{item}</li>
    })}
   </ul>
   </>
  )
}
