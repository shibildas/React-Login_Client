import axios from "../../axios/axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AppContext } from "../../context/AppContext";

const SignupComponent= ()=>{
    const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const { relogin,setRelogin, loginStatus, setLoginStatus } =
    useContext(AppContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (relogin) {
      swal("Registered success!", "Login now", "success");
    }
    if (password !== cpassword) {
      setError("Password Not match");
    } else if (password === "" || cpassword === "") {
      setError("Password required");
    } else {
      setError("matched");
    }
  }, [cpassword, relogin]);
  useEffect(() => {
    axios
      .get("/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        if (!response.data.auth) {
          setLoginStatus(false);
        } else {
          setLoginStatus(true);
        }
      });
  }, [loginStatus]);


    const handlesignup = (e) => {
        e.preventDefault();
        if (
          password === "" ||
          cpassword === "" ||
          email === "" ||
          username === ""
        ) {
          setError("All fields are required");
        } else if (password !== cpassword) {
          setError("confirm password notmatch");
          swal("sorry!", "Confirm password not match!", "error");
        } else {
          axios.post("/signup", {
              username: username,
              email: email,
              password: password,
            })
            .then((response) => {
              console.log(response.data);
              if (response.data.status === "success") {
                setRelogin(true);
                setLogin(false)
              } else {
                swal("OOPS", response.data.message, "error");
              }
            })
            .catch((err) => {
              alert("network error: " + err.message);
            });
        }
      };
      const handlelogin = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
          swal("sorry", "All fields are required!", "error");
        } else {
          axios
            .post("/login", {
              email: email,
              password: password,
            })
            .then((response) => {
              console.log(response.data);
              if (!response.data.auth) {
                setLoginStatus(false);
                swal("sorry", response.data.message, "error");
              } else {
                setLoginStatus(true);
                localStorage.setItem("token", response.data.token);
                swal("success", response.data.message, "success");
                setLoginStatus(true);
                navigate("/home")
              }
            });
        }
      };
 
    return(
        <>
        <div className="bg-gradient-to-r from-pink-400 to-white h-[100vh] w-full flex justify-center items-center">
        {login ? <>
        <div className="p-20 border-solid bg-gradient-to-l from-pink-500 to-slate-500 rounded-3xl m-2">
        <h1 className="text-4xl text-center m-3 font-bold text-white">Sign Up</h1>

        <form onSubmit={handlesignup} >
                <div className="p-2 flex">
                  <i className="bx bx-user pr-2 text-3xl cursor-pointer"></i>
                  <input className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    />
                </div>
                <div className="p-2 flex">
                  <i className="bx bx-mail-send pr-2 text-3xl cursor-pointer"></i>
                  <input className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
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
                <div className="p-2 flex">
                  <i className="bx bxs-lock-alt pr-2 text-3xl cursor-pointer"></i>
                  <input className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                    type="password"
                    onChange={(e) => {
                      setCpassword(e.target.value);
                    }}
                    value={cpassword}
                    placeholder="Confirm password"
                  />
                </div>
                {/* <span style={{color:'red',fontsize:'0.3px'}}>{error}</span> */}
                <button className="ml-24 hover:bg-black bg-purple-800 mt-2 p-1 pr-2 pl-2 rounded-lg text-white">Sign up</button>
              </form>
              <div>

              <p>
                <span>Already have an account? </span>
                <b
                   onClick={() => {
                    setLogin(false);
                  }}
                className="cursor-pointer"
                >
                  Sign in here
                </b>
              </p>
                    </div>
                    </div>
                    </>
                    :
                    <>
                    <div className="p-20 border-solid bg-gradient-to-l from-purple-500 to-orange-500 rounded-3xl m-2">
                      <h1 className="text-4xl text-center m-3 font-bold text-white">Log In</h1>

        <form onSubmit={handlelogin} >
                <div className="p-2 flex">
                  <i className="bx bx-user pr-2 text-3xl cursor-pointer"></i>
                  <input className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    />
                </div>
                
                <div className="p-2 flex">
                  <i className="bx bxs-lock-alt pr-2 text-3xl cursor-pointer"></i>
                  <input className="placeholder:text-gray-600 rounded-lg bg-indigo-200 focus:bg-lime-200 text-black p-2"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                {/* <span style={{color:'red',fontsize:'0.3px'}}>{error}</span> */}
                <button className="ml-24 hover:bg-black bg-purple-800 mt-2 p-1 pr-2 pl-2 rounded-lg text-white">Sign In</button>
              </form>
              <div>

              <p>
                <span>Don't have an account? </span>
                <b
                onClick={() => {
                  setLogin(true);
                }}
                className="cursor-pointer"
                >
                   Sign up here
                </b>
              </p>
                    </div>
                    </div>
                    </>}
            </div>
        </>
    )
}
export default SignupComponent