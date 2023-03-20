import Admin from "../Admin/Admin"


const Dashboard = ()=>{
    const welcome = ["A","D","M","I","N"]
    return(
        <>
        <div className="ml-0 shadow-slate-600 shadow-inner bg-gradient-to-l from-pink-200 to-indigo-600 h-[100vh] flex justify-around items-center font-style:italic">
            {welcome.map(l=><h1 className="text-6xl font-bold text-gray-700">{l}</h1>)}
        </div>
        
        </>
    )
}
export default Dashboard 