export  function filterData(text,user){
    return user.filter((us)=> us?.username?.toLowerCase().includes(text?.toLowerCase()) || us?.email?.toLowerCase().includes(text?.toLowerCase())
    )
  
  }
