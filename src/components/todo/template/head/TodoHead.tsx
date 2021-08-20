import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 52px;
    padding-bottom: 24px;
    border-bottom: 3px solid #33bb77;
`;

const DateBlock = styled.div`
    display: flex;
    justify-content: center;
`;

const DateText = styled.div`
    font-size: 26px;
    color: #119955;
    padding-left: 10px;
`;

const DayText = styled.div`
    font-size: 22px;
    color: #119955;
    padding-top: 5px;
`;

const TimeText = styled.div`
    font-size: 18px;
    color: #119955;
    padding-top: 5px;
`;

const weekName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const TodoHead = () => {
    //@TODO 현재 시간을 표시해야합니다.
    const nowDate = new Date();
    const weekDayNumber = nowDate.getDay();
    const dateString = nowDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const [nowTime, setNowTime] = useState("");
    useEffect(() => {
        const timer = setInterval(
            () => setNowTime(nowDate.toTimeString()),
            1000
        );
        return () => clearInterval(timer);
    });

    return (
        <TodoHeadBlock>
            <DateBlock>
                <DayText>{weekName[weekDayNumber]}</DayText>
                <DateText>{dateString}</DateText>
            </DateBlock>
            <TimeText>{nowTime.substr(0, 8)}</TimeText>
        </TodoHeadBlock>
    );
};

export default React.memo(TodoHead);
