import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import Modal from "./Modal"; // Import the Modal component
import Clock from "./Clock"; // Import the Clock component

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [modalMessage, setModalMessage] = useState(""); // State to store modal message
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    // Function to calculate brightness of a color
    const getColorBrightness = (color) => {
        const rgb = color.match(/\d+/g);
        const r = parseInt(rgb[0], 10);
        const g = parseInt(rgb[1], 10);
        const b = parseInt(rgb[2], 10);

        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return brightness;
    };

    // Function to generate random colors
    const getRandomColor = () => {
        const colors = [
            "rgb(255, 99, 71)", // Tomato
            "rgb(255, 140, 0)", // Dark Orange
            "rgb(255, 215, 0)", // Gold
            "rgb(50, 205, 50)", // Lime Green
            "rgb(30, 144, 255)", // Dodger Blue
            "rgb(138, 43, 226)", // Blue Violet
            "rgb(255, 20, 147)", // Deep Pink
            "rgb(255, 69, 0)", // Orange Red
            "rgb(218, 165, 32)", // Goldenrod
            "rgb(127, 255, 0)", // Chartreuse
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Modify the addTodo function to set a color and adjust text color
    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const randomColor = getRandomColor();
        const brightness = getColorBrightness(randomColor);
        const textColor = brightness > 128 ? "black" : "white"; // Choose text color based on brightness

        const newTodo = {
            ...todo,
            color: randomColor,
            textColor: textColor, // Add text color for each todo item
        };

        setTodos([newTodo, ...todos]);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos((prev) =>
            prev.map((item) => (item.id === todoId ? { ...item, text: newValue.text } : item))
        );
        showModalWithMessage("Todo updated successfully!"); // Show custom modal after update
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        showModalWithMessage("Todo removed successfully!"); // Show custom modal after removal
    };

    const completeTodo = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
        showModalWithMessage("Todo marked as complete!"); // Show custom modal after completing
    };

    const showModalWithMessage = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Clock /> {/* Add the Clock component first */}
            <h1>What's The Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
            {showModal && <Modal message={modalMessage} onClose={closeModal} />}
        </>
    );
};

export default TodoList;
