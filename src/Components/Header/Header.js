import React, { useContext } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logo } from "../../constants/constants"
import { AppContext } from "../../context/AppContext"

const Header = ()=>{

    const {setLoginStatus } = useContext(AppContext)
    const navigate = useNavigate()
    const logout=()=>{
        localStorage.removeItem('token')
        setLoginStatus(false)
        navigate("/")
    }
    const user = useSelector((state)=>state.user.value)
    return(
        <div className="p-4 shadow-2xl w-full bg-gradient-to-r from-purple-500 to-pink-300 flex font-mono font-bold text-white first-letter:font-extrabold justify-around self-center">
            <div className="">
                <img className="w-16 rounded-full" src={logo} alt="Logo" />
            </div>
            <div className="justify-center">
                <ul className="flex justify-between space-x-3 self-center">
                    <li className=" hover:bg-slate-200 hover:text-purple-800 rounded-lg p-2 cursor-pointer shadow shadow-violet-800 hover:shadow-inner hover:shadow-violet-900" onClick={()=>{
                        navigate('/home')
                    }}><i className='bx bxs-home-alt-2'></i>Home</li>
                    <li className=" hover:bg-slate-200 hover:text-purple-800 rounded-lg p-2 cursor-pointer shadow shadow-violet-800 hover:shadow-inner hover:shadow-violet-900" onClick={()=>{
                        navigate('/profile')
                    }}>Profile</li>
                    <li className=" hover:bg-slate-200 hover:text-purple-800 rounded-lg p-2 cursor-pointer shadow shadow-violet-800 hover:shadow-inner hover:shadow-violet-900">About</li>
                    <li className=" hover:bg-slate-200 hover:text-purple-800 rounded-lg p-2 cursor-pointer shadow shadow-violet-800 hover:shadow-inner hover:shadow-violet-900">Contact</li>
                </ul>
            </div>
            <div>

            </div>
                <h1 className=" mt-2">Hello , {user?.username?.toUpperCase()} </h1>
            <div>
                <button className="underline hover:bg-purple-700 rounded-full p-2 shadow-pink-700 shadow"
                onClick={logout}><i className='bx bx-log-out-circle' ></i> Logout</button>
            </div>

        
        </div>
    )
}
export default Header