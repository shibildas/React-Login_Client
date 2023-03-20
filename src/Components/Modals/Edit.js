import Modal from "react-modal";
import axios from "../../axios/axios";
import swal from "sweetalert";
import { useEffect, useState } from "react";

const Edit = ({ isShow, handleCloseEdit, user}) => {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  let [image, setImage] = useState(null);
  useEffect(() => {
    setUsername(user.username);
    setId(user._id);
    setEmail(user.email);
  }, [isShow]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
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
    const errors = {};
    if (!username.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (Object.keys(errors).length > 0) {
      let errorList = "";
      Object.values(errors).forEach((msg) => {
        errorList += `${msg}\n`;
      });
      swal("Validation Error", errorList, "error");
      setErrors(errors);
      return;
    }
    setSubmitting(true);
    axios
      .post(
        "/admin/edit_Profile",
        {
          id: id || user._id,
          username: username || user.username,
          email: email || user.email,
          image: imgBase,
        },
        {
          headers: {
            "x-access-admintoken": localStorage.getItem("admintoken"),
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
         
          alert("Success", response.data.message, "success");
          handleCloseEdit();
          setUsername("");
          setEmail("");
          setId("");
          setImage(null);
        } else {
          alert("Error", "An error occurred. Please try again later.", "error");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <Modal
      isOpen={isShow}
      onRequestClose={handleCloseEdit}
      className="flex justify-center self-center"
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
              onClick={handleCloseEdit}
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
                <input type="text" value={id} hidden />
              </label>
              <label className="block mb-2 font-bold p-2 text-purple-600">
                Profile Pic:
                <span className=" text-white p-2">
                  {" "}
                  {user?.image ? (
                    <img className="w-20" src={user.image} alt="img" />
                  ) : (
                    "No image"
                  )}
                </span>
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
                  onClick={handleCloseEdit}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
                  type="submit"
                >
                  {submitting ? "Updating" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default Edit;
