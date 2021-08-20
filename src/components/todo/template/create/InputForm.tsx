import styled from "styled-components";
import moment, { Moment } from "moment";
import { DatePicker } from "antd";
import { ReactElement } from "react";

const Input = styled.input`
    padding: 12px;
    border: 1px solid #dddddd;
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

const StyledDatePicker = styled(DatePicker)`
    margin-top: 12px;
    width: 50%;
`;
const InputContainer = styled.div``;

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
}: inputProps): ReactElement => {
    function disabledDate(current: any) {
        // Can not select days before today
        return (
            current &&
            current.format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")
        );
    }

    return (
        <InputContainer>
            <Input
                autoFocus
                placeholder="What's need to be done?"
                onChange={handleTextChange}
                value={value.text}
            />
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
