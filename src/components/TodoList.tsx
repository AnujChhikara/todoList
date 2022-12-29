import React from 'react'
import Todo from './model'
import SingleTodo from './SingleTodo';
import {Droppable} from "react-beautiful-dnd"
import "./style.css";


interface Props {
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    completedTodos: Array<Todo>;
  }
  

const TodoList:React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    <div className='flex sm:flex-col md:flex-row md:space-x-20 pt-4 mt-4'>
        <Droppable droppableId='TodosList'>
            {(provided, snapshot)=> (
                  <div className={`bg-teal-400 ${snapshot.isDraggingOver ? "dragactive" : ""} rounded-xl px-4 py-1 md:w-[420px] sm:w-[320px] `} ref={provided.innerRef} {...provided.droppableProps}>
                  <span className='text-gray-600 text-lg '>Active Task</span>
                  
                  {
                      todos?.map((todo, index) => (
                          <SingleTodo 
                          index= {index}
                       
                          todos={todos}
                          todo={todo}
                          key={todo.id}
                          setTodos={setTodos}/>
                      ))
                  }
                   {provided.placeholder}
      
              </div>

            )}
            </Droppable>
            <Droppable droppableId='TodosRemove'>
            {(provided, snapshot)=> (
      
        <div className={`bg-red-500 sm:mt-4 md:w-[420px] sm:w-[320px] md:mt-0 rounded-xl px-4 py-1 ${snapshot.isDraggingOver ? "dragcomplete" : "remove" } `}
             ref={provided.innerRef}
             {...provided.droppableProps}>
            <span className='text-white text-lg'>
                Completed Task
            </span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}

            
        </div> )}
        </Droppable>
    </div>
  )
}

export default TodoList
