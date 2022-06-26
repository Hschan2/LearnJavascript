import React from 'react';
import { Todo, ToggleTodo } from './Todo';
import { TodoListItem } from './TodoListItem';
import './TodoList.css';

interface Props {
    todos: Todo[];
    toggleTodo: ToggleTodo;
}

// 내용 출력
export const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
    return (
        <ul>
            {todos.map(todo => (
                <TodoListItem key = {todo.text} todo = {todo} toggleTodo = {toggleTodo} />
            ))}
        </ul>
    );
};