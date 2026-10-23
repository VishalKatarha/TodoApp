"use client"
import React, { useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';

const page = () => {

  const [todo,setTodo] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [todId, setTodoId] = React.useState(null);
  const router = useRouter();
  const [refresh, setRefresh] = React.useState(false);

  if (todo) {
    console.log('todo:', todo);
  }

  const {push} = useRouter();


useEffect(() => {
  const GetTodos = async () => {
    try {
      const response = await axios.get("/api/todo");
      console.log("API Response:", response.data);
      setTodo(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

      GetTodos();
    }, [refresh]);


  const handlenavigate = () => {
    push('/add');
  }

  const handleupdate = (id) => {
  console.log("Clicked Todo ID:", id);
  push(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    setIsModalVisible(true);
    setTodoId(id);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/todo/${todId}`
        );
  
        console.log("Status:", response.status);
        console.log("Data:", response.data);
  
        if (response.status === 200 || response.status === 201) {
          toast.success("Todo deleted successfully!");
          router.push("/");
          router.refresh();
          setIsModalVisible(false);
          setRefresh(!refresh);
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
        toast.error("Todo delete nahi hua");
      }
    };

  return (
    <>
    <Modal isVisible={isModalVisible} onClose={()=>setIsModalVisible(false)} onConfirm={handleSubmit}/>
    <div className='flex justify-center items-center '>
     <div className='bg-yellow-200 w-2/4 flex flex-col gap-8 rounded-lg shadow-xl text-black p-5 mt-10'>

     <div className='flex justify-between items-center'>
       <img
      src="/logo.png"
      alt="Burnitup"
      className="w-10 h-10 object-contain"
      />
      <h1 className='text-2xl font-bold'>Todo App</h1>
      <button className='bg-blue-500 flex mt-2 text-white px-4 py-2 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.4)]' onClick={handlenavigate} >Add< FaPlus className='ml-2 mt-1'/></button>
     </div>

     <div className='flex gap-5 text-start flex-col'>
          {todo && todo.map((element) =>{
            return(
              <div key={element._id} className='flex justify-between items-center bg-white p-3 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.4)] w-full border-b-4 border-b-blue border-blue-500'>
                <div className='flex flex-col gap-1 w-60'>
                  <h1 className='text-lg font-semibold'>{element.title}</h1>
                  <p className='text-gray-600'>{element.description}</p>
                </div>
                <div className='flex-col flex justify-center gap-3'>
                  <MdDelete size={20} color="red" cursor="pointer" onClick={() => handleDelete(element._id)
                  }/>
                  <FaPen
                    size={15}
                    className="cursor-pointer"
                    onClick={() => handleupdate(element._id)}
                  />
                </div>

              </div>
                )
                  })}
     </div>

     </div>
      
    </div>
    </>
  )
}

export default page
