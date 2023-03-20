import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import  axios  from "../../axios/axios";
import { login } from "../../redux/user";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");
import swal from "sweetalert";
import Header from "../Header/Header";

const Profile = () => {
  const [show, setShow] = useState(false);
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [image, setImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(login);
  const { setLoginStatus } = useContext(AppContext);
  const user = useSelector((state) => state.user.value);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toBase64 = (image) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }).catch((err) => {
      console.log(err);
    });
  const editHandler = async (e) => {
    e.preventDefault();

    const imgBase = await toBase64(image);
    
    axios.post("/user_edit",{
          username: username || user.username,
          email: email || user.email,
          image: imgBase,
        },
        {
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      ).then((response) => {
        if (response.data.status === "failed") {
          setLoginStatus(false);
          swal("session expired pease login");
        } else {
          swal("success, Profile Updated");
          console.log(response.data.result);
          dispatch(login(response.data.result));
          handleClose();
        }
      });
  };
  useEffect(() => {
    user && setEmail(user.email);
    user && setUsername(user.username);
  }, [user]);

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-pink-400 to-white h-[100vh] w-full flex justify-center items-center">
        <div className="p-20 border-solid bg-gradient-to-l from-pink-500 to-slate-500 rounded-3xl m-2">
          <h1 className="text-center text-4xl font-extrabold text-purple-50 p-2 m-2 mb-6">Profile</h1>
          <div className="outline outline-offset-1 w-64 h-64 flex justify-center outline-slate-600 m-2 mb-5">
            {user?.image ? <img className="w-56 h-56 mt-4" src={user.image} alt="img" /> : "No image"}
          </div>
          <div className="m-2">
            <h1 className="font-semibold text-orange-100 text-3xl">Username: <b>{user.username}</b></h1>
            <h1 className="font-semibold text-orange-100 text-3xl mt-5">E-mail: <b>{user.email}</b></h1>
            <div className="flex justify-between mt-5">
              <button className="p-2 bg-gray-600 text-white rounded hover:bg-orange-400 focus:outline-none focus:bg-blue-600" onClick={() => navigate("/home")} >
                 Back 
              </button>
              <button className="p-2 bg-indigo-500 text-white rounded hover:bg-lime-500 focus:outline-none focus:bg-blue-600" onClick={handleShow}>
                Edit Profile
              </button>
            </div>
            <div></div>
          </div>
        </div>

        <ReactModal
          isOpen={show}
          onRequestClose={handleClose}
          className="flex justify-center self-center"
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <div className="flex justify-center mt-[15%]">
          <div className="border border-neutral-500 p-10 bg-gradient-to-br outline outline-pink-500 from-amber-300 to-teal-400">
            <div className=" px-4 py-3 sm:px-6 h-max">
              <h3 className="font-medium leading-6 text-gray-900 text-3xl text-center">
                Edit Profile
              </h3>
              <button
                className="absolute top-0 right-0 px-4 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={handleClose}
              >
                <svg
                  className="h-6 w-6 "
                  stroke="black"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={editHandler}>
                <label className="block mb-2 font-bold text-purple-600">
                  Name:
                  <input
                    className="p-2 outline outline-gray-400 focus:bg-amber-300 text-gray-900 form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                <label className="block mb-2 font-bold  text-purple-600">
                  Email:
                  <input
                    className="p-2 text-gray-900  outline-gray-400 focus:bg-amber-300 form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    type="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="block mb-2 font-bold p-2 text-purple-600">
                  Profile Pic:
                  <span className=" text-white p-2"> {user?.image ? <img className="w-20" src={user.image} alt="img" /> : "No image"}</span>
                  <input
                    className="form-input mt-1 block w-full cursor-pointer"
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    
                  />
                </label>
                <div className="flex justify-around">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-rose-700 focus:outline-none focus:bg-blue-600"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
            </div>
          </div>
        </ReactModal>
      </div>
    </>
  );
};

export default Profile;
