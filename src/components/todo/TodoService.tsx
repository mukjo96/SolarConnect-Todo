/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";

export type Itodo = {
    id: number;
    text: string;
    done: boolean;
    goalDate: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
    const [todoState, setTodoState] = useState(initialTodos);
    const nextId = useRef(1);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        saveData();
    }, [todoState]);

    const incrementNextId = (todoList: Itodo[]) => {
        if (todoList.length > 0) {
            nextId.current = todoList[todoList.length - 1].id + 1;
        } else {
            nextId.current = 0;
        }
    };

    const toggleTodo = (id: number) => {
        //@TODO
        const todoIndex = todoState.findIndex((todo) => todo.id === id);
        const changingTodo = todoState[todoIndex];
        changingTodo.done = !changingTodo.done;
        setTodoState((prevState) => {
            prevState.splice(todoIndex, 1, changingTodo);
            return [...prevState];
        });
    };

    const editTodo = (id: number, newTodo: Itodo) => {
        const todoIndex = todoState.findIndex((todo) => todo.id === id);
        setTodoState((prevState) => {
            prevState.splice(todoIndex, 1, newTodo);
            return [...prevState];
        });
    };

    const removeTodo = (id: number) => {
        setTodoState((prevState) =>
            prevState.filter((todo: Itodo) => todo.id !== id)
        );
    };

    const createTodo = (todo: Itodo) => {
        incrementNextId(todoState);
        setTodoState((prevState) =>
            prevState.concat({
                ...todo,
                id: nextId.current,
            })
        );
    };

    const loadData = () => {
        let data = localStorage.getItem("todos");
        if (data === undefined) data = "";
        initialTodos = JSON.parse(data!) ?? [];
        setTodoState(initialTodos);
    };

    const saveData = () => {
        localStorage.setItem("todos", JSON.stringify(todoState));
    };

    return {
        todoState,
        nextId,
        incrementNextId,
        toggleTodo,
        removeTodo,
        createTodo,
        editTodo,
    };
};
