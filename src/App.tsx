import React, { useState } from 'react';
import './App.css';
import Inputfield from './components/Inputfield';
import TodoList from './components/TodoList';
import Todo from './components/model';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd=(e:React.FormEvent) =>{
    e.preventDefault()
    if(todo) {
      setTodos([...todos, {id:Date.now(),todo, isDone:false}])
      setTodo("")
    }
  }
  const onDragEnd = (result: DropResult) => {
   
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };


 

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className=" font-neucha sm:bg-body w-full lg:bg-gray-800 h-screen w-screen flex  items-center flex-col  ">
      <div className='mt-8'>
      <div className=' w-full mb-2 '>
      <span className='text-white flex justify-center items-center py-3 text-3xl'>Taskify</span>
      </div>
      <div className="">
          <Inputfield todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      </div>
      <div className=''>
        <TodoList todos={todos} setTodos={setTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
        />
        
      </div>
      </div>
    
    
               
               <div className='flex  justify-center '>
               
                <h2 className="font-nunito mt-2 text-white bottom-0 fixed mb-4"> &#169; 2022 Anuj Chhikara </h2>
                
               </div>
            </div>
        
   
    </DragDropContext>
  );
}

export default App;

