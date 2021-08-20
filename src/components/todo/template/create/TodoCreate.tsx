import React, { useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import { Moment } from "moment";

import InputForm from "./InputForm";

const CircleButton = styled.button<{ open: boolean }>`
    background: #33bb77;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    left: 50%;
    transform: translate(50%, 0%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #eeeeee;
    padding-left: 40px;
    padding-top: 36px;
    padding-right: 60px;
    padding-bottom: 36px;
`;

interface TodoCreateProps {
    nextId: number;
    createTodo: (todo: Itodo) => void;
    incrementNextId: () => void;
}

const TodoCreate = ({
    nextId,
    createTodo,
    incrementNextId,
}: TodoCreateProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState({
        text: "",
        goalDate: "",
    });

    const handleToggle = () => setOpen(!open);
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue((prev) => ({ ...prev, text: e.target.value }));
    const handleDateChange = (value: Moment | null, dateString: string) =>
        setValue((prev) => ({ ...prev, goalDate: dateString }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 새로고침 방지

        createTodo({
            id: nextId,
            text: value.text,
            done: false,
            goalDate: value.goalDate,
        });
        incrementNextId(); // nextId 하나 증가

        setValue({ text: "", goalDate: "" }); // input 초기화
        setOpen(false); // open 닫기
    };

    return (
        <>
            <InsertFormPositioner>
                <InsertForm onSubmit={handleSubmit}>
                    <InputForm
                        handleTextChange={handleTextChange}
                        handleDateChange={handleDateChange}
                        value={value}
                    />
                    <CircleButton onClick={handleToggle} open={open}>
                        <PlusCircleOutlined />
                    </CircleButton>
                </InsertForm>
            </InsertFormPositioner>
        </>
    );
};

export default React.memo(TodoCreate);
