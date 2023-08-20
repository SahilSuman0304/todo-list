import React ,{useState ,useEffect }from 'react';
import Header from"./components/header.js";
import Form from "./components/form.js";
import TodoList from './components/todoList.js';
import {DragDropContext} from 'react-beautiful-dnd'

import './App.css';

const App = () => {

  const initialState = JSON.parse(localStorage.getItem("todos")) ||[];
  const[input,setInput] = useState("");
  const[todos,setTodos] = useState(initialState)
  const [editTodo,setEditTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])
 
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const displayedTodos = todos.filter((task) => {
    if (!task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    switch (filterOption) {
      case "completed":
        return task.completed;
      case "uncompleted":
        return !task.completed;
      default:
        return true;
    }
  });
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...todos];
    const [removed] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, removed);

    setTodos(updatedTasks);
  };
    

  return (
    <div className="container">
     <div className="app-wrapper">
     <div> 
        <Header />  
      </div>
      <div>
        <Form
        input = {input}
        setInput = {setInput}
        todos={todos}
        setTodos={setTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        />  
      </div>
      <div className="search-div">
      <input
          type="text"
          placeholder="Search Tasks"
          className="task-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          name="filterOption"
          className="button-select"
          value={filterOption}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select> 
      </div>
      <div>
        <DragDropContext onDragEnd={handleDragEnd} >
        <TodoList  
        todos = {displayedTodos}  
        setTodos={setTodos}
        setEditTodo={setEditTodo}
        />
        </DragDropContext>
      </div>
        
     </div>
    </div>
  );
}

export default App;
