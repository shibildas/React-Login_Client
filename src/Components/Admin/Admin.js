import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppContext } from "../../context/AppContext"
import { adminLogo } from "../../constants/constants"
import { useContext } from "react"
import useGetAxios from "../../Utils/useGetAxios"



const Admin = (props)=>{
    const navigate=useNavigate()
  
    const admin = useSelector((state)=>state.admin.value)
     const {setAdminLoginStatus} = useContext(AppContext)
     const endpoint = '/admin/getUsers';
     const token = localStorage.getItem('admintoken');
     const result = useGetAxios(endpoint,token,props)
    const logout=()=>{
        localStorage.removeItem('admintoken')
        setAdminLoginStatus(false)
        navigate("/admin")
    }   
  const showHome =()=>{
    props.dash(true)
    props.user(false)
  }
  const showUser =()=>{
    props.dash(false)
    props.user(true)
    props.setUsers(result)
  
       
      
  }


    return(
        <>
        
        <div className="p-4 shadow-2xl w-full bg-gradient-to-r from-gray-600 to-purple-300 flex font-mono font-bold text-white first-letter:font-extrabold justify-around self-center">
            <div className="">
                <img className="w-16 h-16 rounded-full" src={adminLogo} alt="Logo" />
            </div>
            <div className="justify-center">
                <ul className="flex justify-between space-x-3 self-center">
                    <li className=" hover:bg-slate-200 hover:text-purple-800 rounded-lg p-2 cursor-pointer shadow shadow-violet-800 hover:shadow-inner hover:shadow-violet-900" onClick={showHome}><i className='bx bxs-home-alt-2'></i> Dashboard</li>
                    <li className=" hover:bg-slate-200 hover:text-purple-800 rounded-lg p-2 cursor-pointer shadow shadow-violet-800 hover:shadow-inner hover:shadow-violet-900" onClick={showUser}>Users</li>
                    {/* <li className=" hover:bg-slate-200 hover:text-purple-800 rounded-lg p-2 cursor-pointer shadow shadow-violet-800 hover:shadow-inner hover:shadow-violet-900">About</li> */}
                    <li className=" hover:bg-slate-200 hover:text-purple-800 rounded-lg p-2 cursor-pointer shadow shadow-violet-800 hover:shadow-inner hover:shadow-violet-900">Contact</li>
                </ul>
            </div>
            <div>

                <h1 className="pt-2">Hello , {admin?.result?.email?.toUpperCase()} </h1>
            </div>
            <div>
                <button className="underline hover:bg-purple-700 rounded-full p-2 shadow-pink-700 shadow"
                onClick={logout}><i className='bx bx-log-out-circle' ></i> Logout</button>
            </div>

        
        </div>
        </>
    )
}
export default Admin