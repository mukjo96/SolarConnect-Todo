import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
    PlusCircleOutlined,
    MinusOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import { Moment } from "moment";

import InputForm from "./InputForm";
import { Modal } from "antd";

const CircleButton = styled.button`
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
const FoldContainer = styled.div`
    width: 100%;
    height: 36px;
    background: #eeeeee;
    display: flex;
    justify-content: flex-end;
`;
const FoldButton = styled.button`
    padding: 0;
    height: 36px;
    margin-right: 40px;
    border: none;
    font-size: 24px;
    color: #33bb77;
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form<{ open: boolean }>`
    /* display: ${(props) => (props.open ? "flex" : "none")}; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #eeeeee;
    padding-left: 40px;
    height: auto;
    max-height: 200px;
    padding-right: 60px;
    padding-bottom: 36px;
    ${(props) =>
        props.open
            ? css`
                  transition: font-size 0.25s, margin 0.25s, padding 0.25s,
                      opacity 0.5s 0.25s, max-height 0.5s ease-in;
              `
            : css`
                  font-size: 0;

                  opacity: 0;
                  padding: 0;
                  max-height: 0;
                  /* fade out, then shrink */
                  transition: opacity 0.25s, font-size 0.5s 0.25s,
                      margin 0.5s 0.25s, padding 0.5s 0.25s,
                      max-height 0.5s ease-out;
              `}
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
        if (value.text) {
            createTodo({
                id: nextId,
                text: value.text,
                done: false,
                goalDate: value.goalDate,
            });
            incrementNextId(); // nextId 하나 증가
            setValue({ text: "", goalDate: "" }); // input 초기화
        } else {
            error();
        }
        setOpen(false); // open 닫기
    };

    function error() {
        Modal.error({
            content: "내용을 입력해주세요.",
        });
    }

    return (
        <>
            <InsertFormPositioner>
                <FoldContainer>
                    <FoldButton onClick={handleToggle}>
                        {open ? <MinusOutlined /> : <PlusOutlined />}
                    </FoldButton>
                </FoldContainer>

                <InsertForm onSubmit={handleSubmit} open={open}>
                    <InputForm
                        handleTextChange={handleTextChange}
                        handleDateChange={handleDateChange}
                        value={value}
                    />
                    <CircleButton type="submit">
                        <PlusCircleOutlined />
                    </CircleButton>
                </InsertForm>
            </InsertFormPositioner>
        </>
    );
};

export default React.memo(TodoCreate);
