import React, { useState } from 'react';
import { Todo, AddTodo } from './Todo';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import './App.css';

const initialTodos: Todo[] = [
  {
    text: 'Please Enter Text',
    complete: false
  },
];

function App() {
  // Togging
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map(todo => {
      if(todo === selectedTodo) {
        return {
          ...todo, // 기존 배열 복사
          complete: !todo.complete, // false
        };
      }
      return todo;
    });
    setTodos(newTodos); // 값 변경
  };

  const addTodo: AddTodo = (text: string) => {
    const newTodo = { text, complete: false };
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo} />
      <AddTodoForm addTodo = {addTodo} />
    </>
  );
}

export default App;
