import { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: "",
    });

    const submitUpdate = (value) => {
        updateTodo(edit.id, value);
        setEdit({ id: null, value: "" });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return (
        <div>
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className={todo.isComplete ? "todo-row complete done" : "todo-row"}
                    style={{ backgroundColor: todo.color }} // Dynamic background color
                >
                    <div
                        onClick={() => completeTodo(todo.id)}
                        className={todo.isComplete ? "todo-text completed" : "todo-text"}
                    >
                        {todo.isComplete ? "Done To Do List" : todo.text} {/* Keep the text as 'Done' when completed */}
                    </div>
                    <div className="icons">
                        <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className="delete-icon" />
                        <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text })} className="edit-icon" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Todo;
