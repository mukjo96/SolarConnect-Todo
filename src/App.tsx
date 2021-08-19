import React from "react";
import "antd/dist/antd.css";
import Spinner from "./components/common/Spinner";
import TodoContainer from "./components/todo/TodoContainer";

function App() {
    //@TODO login
    const isLogged = true;

    const RenderLayout = (
        <div>
            <TodoContainer />
        </div>
    );

    return isLogged ? RenderLayout : <Spinner mask />;
}

export default App;
