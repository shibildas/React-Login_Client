import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from "../../axios/axios"
import { adminlogin } from '../../redux/admin'
import { useDispatch,useSelector } from 'react-redux'
import { AppContext } from '../../context/AppContext'


const AdminLogin = ()=>{
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {adminLoginStatus,setAdminLoginStatus} = useContext(AppContext)
    const dispatch = useDispatch(adminlogin)
    const admin = useSelector((state)=>state.admin.value)

    const loginHandler = (e)=>{
       
        e.preventDefault();

    
        axios.post('/admin',{email,password}).then((response)=>{
            console.log(admin)
            if(!response.data.auth){
                swal(response.data.message)
            }else{
                dispatch(adminlogin(response.data))
                localStorage.setItem("admintoken",response.data.token)
                swal('success',response.data.message,'success')
                
                setAdminLoginStatus(true)
                
                
            }
        }).catch((err)=>{
            swal('sorry',err.message,'error')
        })
       
    }

    return(
        <>
        <div className="bg-gradient-to-r from-gray-700 to-white h-[100vh] w-full flex justify-center items-center">
        <div className="p-20 border-solid bg-gradient-to-l from-purple-400 to-orange-300 rounded-3xl m-2">
        <h1 className='text-center p-2 font-bold text-4xl'>Admin Login</h1>

          <form onSubmit={loginHandler} >
                <div className="p-2 flex">
                  <i className="bx bx-user pr-2 text-3xl cursor-pointer"></i>
                  <input className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="E-mail"
                    />
                </div>
                
                <div className="p-2 flex">
                  <i className="bx bxs-lock-alt pr-2 text-3xl cursor-pointer"></i>
                  <input className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    />
                </div>
                <button className="ml-24 hover:bg-black bg-gray-800 mt-2 p-1 pr-2 pl-2 rounded-lg text-white">Sign In</button>
              </form>  
        </div>

        </div>


        </>
    )
}
export default AdminLogin