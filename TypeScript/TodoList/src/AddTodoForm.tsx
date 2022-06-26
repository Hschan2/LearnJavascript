import React, {useState} from 'react';
import { AddTodo } from './Todo';
import './AddTodoForm.css';

interface Props {
    addTodo: AddTodo;
}

// Button 만들기
export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
    const [text, setText] = useState(''); // 초기화

    return (
        <form>
            <input type = "text" value = {text} onChange = {e => { setText(e.target.value); }} />
            <button type = "submit" onClick = {e => { e.preventDefault(); addTodo(text); setText(''); }} >Add Todo</button>
        </form>
    );
};