import React, {  useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import UserList from '../UserList/UserList'
import Admin from './Admin'



const AdminLayout=()=> {
    const [dashContent, setDashContent] = useState(true)
    const [userContent, setUserContent] = useState(false)
    const [users, setUsers] = useState([])
   
  

  return (
    <div>
        <Admin dash={setDashContent} user={setUserContent} setUsers={setUsers}/>
        {dashContent && <Dashboard />}
        {userContent && <UserList users={users} setUsers={setUsers}/>}
  
    </div>
  )
}

export default AdminLayout