const Body = ()=>{
    const welcome = ["W","E","L","C","O","M","E"]
    return(
        <>
        <div className="ml-0 shadow-slate-600 shadow-inner bg-gradient-to-l from-pink-300 to-sky-200 h-[100vh] flex justify-around items-center font-style:italic">
            {welcome.map((l,index)=><h1 key={index} className="text-6xl font-bold text-green-700">{l}</h1>)}
        </div>
        </>
    )
}
export default Body