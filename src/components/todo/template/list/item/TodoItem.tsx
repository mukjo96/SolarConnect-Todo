import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Modal } from "antd";
import moment, { Moment } from "moment";

import InputForm from "../../create/InputForm";
import { ellipsisModal } from "components/common/Modal";
import { validateText } from "utils/validate";

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #119955;
    font-size: 16px;
    :hover {
        cursor: pointer;
    }
`;

const Edit = styled(Remove)`
    margin-right: 12px;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
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

const Text = styled.div<{ done: boolean; isOverflow?: boolean }>`
    flex: 1;
    font-size: 16px;
    color: #119955;
    overflow: hidden;
    text-overflow: ellipsis;
    ${(props) =>
        props.done &&
        css`
            color: #ced4da;
            text-decoration: line-through;
            span {
                color: #ced4da;
            }
        `}
    cursor: ${(props) => props.isOverflow && "pointer"};
`;

const BeforeDate = styled.span`
    color: red;
`;

interface TodoItemProps {
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    editTodo: (id: number, todo: Itodo) => void;
    todo: Itodo;
}

const TodoItem = ({
    toggleTodo,
    removeTodo,
    editTodo,
    todo,
}: TodoItemProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editValue, setEditValue] = useState(todo);
    const [isOverflow, setIsOverflow] = useState(false);
    const textRef = useRef<HTMLInputElement>(null);

    const { text, done } = todo;
    const goalMoment = moment(todo.goalDate, "YYYY-MM-DD");
    const goalDate = todo.goalDate ? (
        goalMoment.diff(moment(), "days", true) >= 0 ? (
            goalMoment.format("ddd MMMM D, YYYY")
        ) : (
            <BeforeDate>{goalMoment.format("ddd MMMM D, YYYY")}</BeforeDate>
        )
    ) : (
        ""
    );

    useEffect(() => {
        const { current } = textRef;
        current && setIsOverflow(isEllipsisActive(textRef.current));
    }, [textRef]);

    const handleToggle = () => {
        toggleTodo(todo.id);
    };

    const handleRemove = () => {
        removeTodo(todo.id);
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        if (validateText(editValue.text) === "success") {
            editTodo(todo.id, editValue);
            setShowEditModal(false);
        }
    };

    const isEllipsisActive = (ref: HTMLInputElement | null) => {
        if (ref) {
            return ref.offsetWidth < ref.scrollWidth;
        }
        return false;
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEditValue((prev) => ({ ...prev, text: e.target.value }));
    const handleDateChange = (value: Moment | null, dateString: string) =>
        setEditValue((prev) => ({ ...prev, goalDate: dateString }));

    const handleTextClick = () => {
        isOverflow && ellipsisModal(text);
    };

    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={handleToggle}>
                {done && <CheckOutlined />}
            </CheckCircle>
            <Text
                done={done}
                ref={textRef}
                onClick={handleTextClick}
                isOverflow={isOverflow}
            >
                {text}
            </Text>
            <Text done={done}>{goalDate}</Text>
            <Edit onClick={() => setShowEditModal(true)}>
                <EditOutlined />
            </Edit>
            <Modal
                title="Todo Edit"
                visible={showEditModal}
                onOk={handleEdit}
                onCancel={() => setShowEditModal(false)}
                okButtonProps={
                    validateText(editValue.text) !== "success"
                        ? { disabled: true }
                        : { disabled: false }
                }
                okText="수정"
                cancelText="취소"
            >
                <InputForm
                    handleTextChange={handleTextChange}
                    handleDateChange={handleDateChange}
                    value={editValue}
                />
            </Modal>
            <Remove onClick={() => setShowDeleteModal(true)}>
                <DeleteOutlined />
            </Remove>

            <Modal
                title={text}
                visible={showDeleteModal}
                onOk={handleRemove}
                onCancel={() => setShowDeleteModal(false)}
                okText="삭제"
                cancelText="취소"
            >
                <p>정말 삭제하시겠습니까?</p>
            </Modal>
        </TodoItemBlock>
    );
};

export default React.memo(TodoItem);
