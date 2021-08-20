import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyle = createGlobalStyle`
  body {
    background: #eeeeee;
    height: auto;
  }
  

  //ant-design component
  .ant-btn {
    :hover, :focus{
      color: #119955 !important;
      border-color: #119955 !important;
    }
  }
  .ant-btn-primary {
    background: #119955 !important;
    border-color: #119955 !important;
    :hover, :focus{
      color: white !important;
      background: #17ad62 !important;
    }
    &:disabled{
      background: #f5f5f5 !important;
      border-color: #d9d9d9 !important;
    }
    
    }

    .ant-picker{
      :hover{
        border-color: #119955 !important;
      }
    }
    .ant-picker-focused{
        border-color: #119955 !important;
        box-shadow: 0 0 0 2px #11995555;
      }
    .ant-picker-cell-inner::before{
      border-color: #119955 !important;
    }
    .ant-picker-today-btn{
      color: #119955 !important;
    }

    
`;

ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>,
    document.getElementById("root")
);
