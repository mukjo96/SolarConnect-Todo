import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Modal } from "antd";

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #119955;
    font-size: 16px;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${Remove} {
            display: initial;
        }
    }
`;

const CheckCircle = styled.div<{ done: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 16px;
    border: 1px solid #33bb77;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${(props) =>
        props.done &&
        css`
            border: 1px solid #dddddd;
            color: #dddddd;
        `}
`;

const Text = styled.div<{ done: boolean }>`
    flex: 1;
    font-size: 16px;
    color: #119955;
    ${(props) =>
        props.done &&
        css`
            color: #ced4da;
            text-decoration: line-through;
        `}
`;

interface TodoItemProps {
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const done = todo.done;
    const handleToggle = () => {
        toggleTodo(todo.id);
    };

    const handleRemove = () => {
        removeTodo(todo.id);
        setIsShowModal(false);
    };

    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={handleToggle}>
                {done && <CheckOutlined />}
            </CheckCircle>
            <Text done={done}>{todo.text}</Text>
            <Text done={done}>{todo.goalDate}</Text>
            <Remove onClick={() => setIsShowModal(true)}>
                <DeleteOutlined />
            </Remove>
            <Modal
                title={todo.text}
                visible={isShowModal}
                onOk={handleRemove}
                onCancel={() => setIsShowModal(false)}
                okText="삭제"
                cancelText="취소"
            >
                <p>정말 삭제하시겠습니까?</p>
            </Modal>
        </TodoItemBlock>
    );
};

export default React.memo(TodoItem);
