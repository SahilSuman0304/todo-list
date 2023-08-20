import React, { useEffect } from "react";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  
  const updateTodo = (title, id, completed,filterOption) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed,filterOption } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleClearCompletedTasks = () => {
    const updatedTasks = todos.filter((e) => !e.completed);
    setTodos(updatedTasks);
  };


  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: todos.length, title: input, completed: false,filterOption: "all"}]);
      setInput(""); 
    } else {
      updateTodo(input, editTodo.id, editTodo.completed,editTodo.filterOption);
    }
  };  

  return (
    <form onSubmit={onFormSubmit}>
        <div>
        <input
        type="text"
        placeholder="Enter Your To-Do.."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodo ? "OK":"Submit"}
      </button>
      <button className="button-task" type="submit" onClick={handleClearCompletedTasks} >
        Clear Tasks
      </button>
        </div>
    </form>
  );
};

export default Form; // Export the component as "Form"


