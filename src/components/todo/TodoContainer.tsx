import { useTodo } from "./TodoService";
import TodoTemplate from "./template/TodoTemplate";
import TodoHead from "./template/head/TodoHead";
import TodoList from "./template/list/TodoList";
import TodoCreate from "./template/create/TodoCreate";
import TodoFooter from "./template/footer/TodoFooter";
import Loading from "components/common/Loading";

const TodoContainer = () => {
    const {
        todoState,
        nextId,
        incrementNextId,
        toggleTodo,
        removeTodo,
        createTodo,
        editTodo,
    } = useTodo();

    if (todoState === null) {
        return <Loading />;
    }

    return (
        <>
            <TodoTemplate>
                <TodoHead />
                <TodoCreate
                    nextId={nextId.current}
                    createTodo={createTodo}
                    incrementNextId={() => incrementNextId(todoState)}
                />
                <TodoList
                    toggleTodo={toggleTodo}
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                    todos={todoState}
                />
                <TodoFooter todos={todoState} />
            </TodoTemplate>
        </>
    );
};

export default TodoContainer;
