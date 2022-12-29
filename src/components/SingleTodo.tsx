import React from 'react'
import Todo from './model'
import "./style.css";
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from "react-icons/md"
import {useState, useRef, useEffect} from "react"
import {Draggable} from "react-beautiful-dnd"
interface Props{
    index: number;
    todo: Todo;
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;

}

const SingleTodo: React.FC<Props>= ({todo, todos, setTodos,index }) => {

    const[edit, setEdit] = useState<boolean>(false) 
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(()=> {
        inputRef.current?.focus()

    },[edit]);

    const handleEdit = (e: React.FormEvent, id: number) =>{
        e.preventDefault()

        setTodos(todos.map((todo) => (
            todo.id === id ? {...todo, todo: editTodo} : todo
        ))
        )
        setEdit(false)

    };

    const handleDone = (id: number) => {
        setTodos
           (todos.map((todo) => 
                        todo.id === id ? {...todo, isDone: !todo.isDone}: todo ))

    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !==id));

    };
  

  
   
   


  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided, snapshot) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  className={`sm:w-72 md:w-96 py-2 shadow-inherit hover:scale-105 duration-75  ${snapshot.isDragging ? "drag" : ""}`}>
        <form action="" className='bg-card flex px-4 py-3 rounded-lg justify-between hover:shadow-[0_0_5px_black] ' onSubmit={(e) => handleEdit(e, todo.id)} >

            {
                edit? (
                        <input 
                            ref={inputRef}
                            className='outline-none md:w-auto sm:w-48 px-1 py-1 text-md'
                            type="text" 
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}/>
                      ):
                      (
                        todo.isDone ?
                             (
                               <s>{todo.todo}</s>
                             ) :
                             (
                               <span>{todo.todo}</span>
                             )
                        )}
            
            
            
            <div className='flex space-x-2'>
                <span className=' cursor-pointer' onClick={() =>{
                    if (!edit && !todo.isDone){
                        setEdit(!edit)
                    }}
                }><AiFillEdit/></span>
                <span className=' cursor-pointer' onClick={()=> handleDelete(todo.id)}><AiFillDelete/></span>
                <span className=' cursor-pointer' onClick={()=> handleDone(todo.id)}><MdDone/></span>

            </div>
                
            
        </form>
      
    </div>

            )
        }
    
    </Draggable>
  )
}

export default SingleTodo
