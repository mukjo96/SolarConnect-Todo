import React from "react";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
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

const options = {
  year: "numeric",
  month: "long",
  day: "numeric"
};
const weekName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  const nowDate = new Date();
  const weekDayNumber = nowDate.getDay();
  const dateString = nowDate.toLocaleString("en-US", options);

  return (
    <TodoHeadBlock>
      <DayText>{weekName[weekDayNumber]}</DayText>
      <DateText>{dateString}</DateText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
