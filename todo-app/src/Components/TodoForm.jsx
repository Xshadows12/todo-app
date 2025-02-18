import React, { useState, useEffect, useRef } from "react";

const TodoForm = ({ edit, onSubmit }) => {
    const [input, setInput] = useState(edit ? edit.value : "");

    const inputRef = useRef(null);
    
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => { 
        e.preventDefault();

        if (!input.trim()) return;

        onSubmit({ id: edit?.id || Math.floor(Math.random() * 10000), text: input });

        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            {edit ? ( 
                <>  
                    <input 
                        placeholder="Update Your Item" 
                        value={input} 
                        onChange={handleChange} 
                        name="text" 
                        ref={inputRef}
                        className="todo-input edit"
                    />
                    <button type="submit" className="todo-button edit">Update</button>
                </>
            ) : (
                <>
                    <input 
                        placeholder="Add a todo" 
                        value={input} 
                        onChange={handleChange} 
                        name="text" 
                        className="todo-input"
                        ref={inputRef}
                    />
                    <button type="submit" className="todo-button">Add Todo</button>
                </>
            )}
        </form>
    );
};

export default TodoForm;
