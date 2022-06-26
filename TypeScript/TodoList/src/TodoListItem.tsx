import React from 'react';
import { Todo, ToggleTodo } from './Todo';

// ToDoListItem를 위한 Props 생성
interface Props {
    todo: Todo;
    toggleTodo: ToggleTodo;
  }
  
  export const TodoListItem: React.FC<Props> = ({ todo, toggleTodo }) => {
    return (
      <li>
        <label
        // complete = true => line-through, false => undefined
          style={{ textDecoration: todo.complete ? 'line-through' : undefined }}
        >
          <input type="checkbox" checked={todo.complete} onClick = {() => {toggleTodo(todo);}} />{' '} {todo.text}
        </label>
      </li>
    );
  };