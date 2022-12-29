import React from 'react'
import 'animate.css';
import {useRef} from "react";
interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e:React.FormEvent)=> void;
}
const Inputfield:React.FC<Props> = ({todo, setTodo, handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className=''>
      <form action="" className='flex justify-center' onSubmit={(e) =>{
        handleAdd(e)
        inputRef.current?.blur()
      } } >
        <input ref={inputRef} type="input" value={todo} onChange={(e)=> setTodo(e.target.value)} name="" id="" placeholder='Enter a task' className=' absolute sm:w-[320px] md:w-[760px] pl-4 pr-16 py-3 rounded-3xl shadow-[inset_0_0_4px_rgba(0,0,0,1)] focus:shadow-[0_0_10px_1000px_rgba(0,0,0,0.3)] focus:outline-none' />
        <button className='hover:scale-90 hover:bg-blue-500 relative  bg-blue-600 p-2 rounded-full text-white font-nunito font-semibold w-10 h-10 sm:ml-64 mt-1 md:ml-[700px]  '  >Go</button>
      </form>
    </div>
  )
}

export default Inputfield
