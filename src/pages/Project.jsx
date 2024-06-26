import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

function Project() {
  const isLoogedIn = useSelector((state)=> state.loogedIn.value)
  const users = useSelector((state)=> state.users.value)
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = location.state.projectId;
  const [tasksInProject,setTasksInProjects] = useState([]);
  useEffect(()=>{
    if(!isLoogedIn) navigate("/login");
    const dataFetchin=async()=>{
      const token = "Bearer" + " " + localStorage.getItem("Token");
      const axiosConfig = {
        headers: {
          Authorization: token
        }
      }
      try {
        const response = await axios.get(`https://tasmang-backend.kuchbhimingwal.com/user/tasksInProject?projectId=${projectId}`,axiosConfig)
        setTasksInProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    dataFetchin();
  },[])
  return (
    <div>
      <div className='ml-5'>Project</div>
      <div className='bg-dashBoardbg rounded-md h-fit'>
        <div className='p-5 font-bold text-lg'>All Projects</div>
        
        <div className='flex justify-center'>
            <div className='lg:w-1/2 md:w-2/3 w-full bg-white m-5 rounded-md shadow-md'> 
          {tasksInProject.map((task) => {
              const date = new Date(task.completionDate);
              const formattedDate = date.toDateString();
            return(
              <div key={task._id} className='border-b border-grayText'>
              <h3 className='text-left m-4 font-bold'>{task.taskName}</h3>
              <p className='w-auto bg-opacity-40 bg-pink m-4 rounded-md p-2 text-sm'>Assign to: {users.find(user => user._id == task.assigTo).firstname}</p>
              <p className='w-auto bg-opacity-40 bg-yellow m-4 rounded-md p-2 text-sm'>Create on: {formattedDate}</p>
              </div>
          )})}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project