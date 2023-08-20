import React from 'react'
import {Droppable , Draggable } from 'react-beautiful-dnd';

const todoList = ({todos,setTodos,setEditTodo }) => {
    if (!Array.isArray(todos)) {
        return null;
      }
    const handleDelete =({id}) => {
      setTodos(todos.filter((todo) =>todo.id !== id))
    }
    
    const handleEdit = ({id}) => {
      const findTodo = todos.find((todo) =>todo.id === id);
      setEditTodo(findTodo);
    }

    const handleComplete = (todo) => {
      setTodos(
        todos.map((item) =>{
          if(item.id === todo.id){
            return{...item, completed:!item.completed}
          }
          return item;
        })
      )
    }

  return (
    <div>
     <Droppable droppableId="droppable">
        {(provided) =>(
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <ul >
              {todos.map((todo, index) => (
                <Draggable DraggableId key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <li className="list-item" key={todo.id} index={index} style={{overflow:'auto'}} >
                           <input
                                style={{pointerEvents:"none"}}
                                value={todo.title}
                                className={`list ${todo.completed ? "complete" :""}`}
                                onChange={(event) => event.preventDefault()} />
                                <div className="icons" >
                                <button className="button-complete " onClick={() =>handleComplete(todo)} >
                                  <i className={`fa fa-square ${todo.completed ? 'fa-check-square' : ''}`} ></i>
                                </button>
                                <button className="button-edit "onClick={() =>handleEdit(todo)} >
                                  <i className=" fa fa-edit " ></i>
                                </button>
                                <button className="button-delete" onClick={() =>handleDelete(todo)} >
                                  <i className=" fa fa-trash " ></i>
                                 </button>
                                 </div>
                           </li>
                      </div>                            
                    )}
                </Draggable>
              ))}
            </ul>
              {provided.placeholder}
          </div>
             )
          }
    </Droppable>  
        </div>
      );
   };

export default todoList 
