import { type } from 'os';
import React from 'react';

// Props 정의
export interface Todo {
    text: string;
    complete: boolean;
}

export type ToggleTodo = (selectedTodo: Todo) => void;

export type AddTodo = (text: string) => void;