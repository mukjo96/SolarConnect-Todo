import { Itodo } from "components/todo/TodoService";
import React from "react";
import styled from "styled-components";
import TodoItem from "./item/TodoItem";

const TodoListBlock = styled.div`
    flex: 1;
    padding: 0 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

const TodoItemHeader = styled.div`
    display: flex;
    position: sticky;
    padding-top: 20px;
    top: 0;
    align-items: center;
    background: white;
`;

const DoneHeader = styled.div`
    margin-left: -6px;
    width: 46px;
    font-weight: bold;
`;
const TextHeader = styled.div`
    flex: 1;
    font-weight: bold;
`;
const IconHeader = styled.div`
    width: 44px;
    text-align: center;
    font-weight: bold;
`;

interface TodoListProps {
    todos: Itodo[];
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    editTodo: (id: number, todo: Itodo) => void;
}

const TodoList = ({
    toggleTodo,
    removeTodo,
    editTodo,
    todos,
}: TodoListProps) => {
    return (
        <TodoListBlock>
            <TodoItemHeader>
                <DoneHeader>Done</DoneHeader>
                <TextHeader>To Do</TextHeader>
                <TextHeader>Goal Date</TextHeader>
                <IconHeader>Edit</IconHeader>
            </TodoItemHeader>
            {todos &&
                todos.map((todo) => (
                    <TodoItem
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                        editTodo={editTodo}
                        key={todo.id}
                        todo={todo}
                    />
                ))}
        </TodoListBlock>
    );
};

export default React.memo(TodoList);
