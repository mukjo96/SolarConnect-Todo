import styled from "styled-components";
import moment, { Moment } from "moment";
import { DatePicker } from "antd";
import { useState } from "react";
import { validateText } from "utils/validate";

const Input = styled.input<{ error: string }>`
    padding: 12px;
    border: 1px solid
        ${(props) => (props.error !== "success" ? "red" : "#dddddd")};
    width: 100%;
    outline: none;
    font-size: 21px;
    box-sizing: border-box;
    color: #119955;
    &::placeholder {
        color: #dddddd;
        font-size: 16px;
    }
`;

const ErrorMessage = styled.div`
    height: 24px;
    color: red;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 50%;
`;
const InputContainer = styled.div`
    width: 70%;
`;

interface inputProps {
    handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (value: Moment | null, dateString: string) => void;
    value: {
        text: string;
        goalDate: string;
    };
}

const InputForm = ({
    handleTextChange,
    handleDateChange,
    value,
}: inputProps) => {
    const [error, setError] = useState("success");

    function disabledDate(current: Moment) {
        // Can not select days before today
        return (
            current &&
            current.format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")
        );
    }

    function handleValidate(e: React.FocusEvent<HTMLInputElement>) {
        const { value } = e.target;
        setError(validateText(value));
    }

    return (
        <InputContainer>
            <Input
                autoFocus
                placeholder="What's need to be done?"
                onChange={handleTextChange}
                value={value.text}
                onBlur={handleValidate}
                error={error}
            />
            <ErrorMessage>{error !== "success" ? error : ""}</ErrorMessage>
            <StyledDatePicker
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                onChange={handleDateChange}
                value={
                    value.goalDate ? moment(value.goalDate, "YYYY-MM-DD") : null
                }
                placeholder="Select your Goal Date"
            />
        </InputContainer>
    );
};
export default InputForm;
