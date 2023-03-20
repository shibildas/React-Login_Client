import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { filterData } from "../../Utils/useFilter";
import FormModal from "../Create/FormModal";
import Edit from "../Modals/Edit";

const UserList = (props) => {
  const [user, setUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [text, setText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setEditForm] = useState(false);
  const [pass, setPass] = useState({});

  const handleFormOpen = () => {
    setShowForm(true);
  };
  function handleEditOpen(e) {
    setPass(e);

    setEditForm(true);
  }

  const handleFormClose = () => {
    setShowForm(false);
  };
  const handleCloseEdit = () => {
    setEditForm(false);
  };

  useEffect(() => {
    setUser(props.users);
    setFilterUser(props.users);
  }, [props.users]);
  const deleteUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(
            "/admin/delete_user",
            { id },
            {
              headers: {
                "x-access-admintoken": localStorage.getItem("admintoken"),
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            props.setUsers(response.data.result);
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          })
          .catch((err) => {
            swal(err.message);
          });
      } else {
        swal("Your file is safe!");
      }
    });
  };
  return (
    <>
      {filterUser.length === 0 ? (
        <>
          <div className="w-full full bg-gradient-to-l from-amber-300 to-purple-300 h-[100vh]">
            <div className="p-10 flex justify-center full bg-gradient-to-l from-amber-300 to-purple-300 ">
              <div className=" flex justify-center full  ">
                <input
                  placeholder="Search"
                  className="rounded-2xl p-3 outline outline-slate-400 focus:bg-indigo-200"
                  type="text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <button
                  className="hover:cursor-pointer p-3 bg-gray-500 rounded-2xl mx-2 text-white hover:bg-indigo-600"
                  onClick={() => {
                    const res = filterData(text, user);
                    setFilterUser(res);
                  }}
                >
                  Search
                </button>
              </div>
            </div>
            <h1 className="text-5xl text-center font-bold mt-10">No Result Found</h1>
          </div>
        </>
      ) : (
        <>
          <div className="w-full bg-gradient-to-l from-amber-300 to-purple-300 ">
            <div className="p-10 flex justify-center full bg-gradient-to-l from-amber-300 to-purple-300 ">
              <input
                placeholder="Search"
                className="rounded-2xl p-3 outline outline-slate-400 focus:bg-indigo-200"
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <button
                className="hover:cursor-pointer p-3 bg-gray-500 rounded-2xl mx-2 text-white hover:bg-indigo-600"
                onClick={() => {
                  const res = filterData(text, user);
                  setFilterUser(res);
                }}
              >
                Search
              </button>
            </div>
            <div className=" ml-20">
              <button
                className="hover:cursor-pointer p-3 bg-green-800 rounded-2xl mx-2 text-white font-bold hover:bg-indigo-600"
                onClick={handleFormOpen}
              >
                Add User
              </button>

              <FormModal isOpen={showForm} onRequestClose={handleFormClose} />
            </div>
            <div className="bg-white shadow-md rounded my-6 p-20 full bg-gradient-to-l from-amber-300 to-purple-300 ">
              <table className="min-w-max w-full table-auto p-5">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal outline outline-offset-4">
                    <th className="py-3 px-6 text-left outline" scope="col">
                      No
                    </th>
                    <th className="py-3 px-6 text-left outline" scope="col">
                      Image
                    </th>
                    <th className="py-3 px-6 text-left outline" scope="col">
                      username
                    </th>
                    <th className="py-3 px-6 text-left outline" scope="col">
                      E-mail
                    </th>
                    <th className="py-3 px-6 text-left outline" scope="col">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {filterUser.map((e, index) => {
                    return (
                      <tr className="outline outline-offset-4" key={index}>
                        <th
                          className="font-mono text-black bg-gray-100 p-4 outline  hover:bg-orange-300 "
                          scope="row"
                        >
                          {index + 1}
                        </th>
                        <td className=" font-mono text-black bg-gray-100 p-4 outline  hover:bg-orange-300">
                          {e?.image ? (
                            <img
                              className="w-20"
                              src={e.image}
                              alt="No_image"
                            />
                          ) : (
                            "No_image"
                          )}
                        </td>
                        <td className=" font-mono text-black bg-gray-100 p-4 outline  hover:bg-orange-300">
                          {e?.username}
                        </td>
                        <td className=" font-mono text-black bg-gray-100 p-4 outline  hover:bg-orange-300">
                          {e?.email}
                        </td>
                        <td className=" font-mono text-black bg-gray-100 p-4 outline  hover:bg-orange-300">
                          <button
                            className="bg-red-400 rounded-xl p-3 mr-2 hover:bg-red-700 text-white font-bold"
                            onClick={() => {
                              deleteUser(e._id);
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-green-400 rounded-xl p-3 ml-2 hover:bg-green-700 text-white font-bold"
                            onClick={() => handleEditOpen(e)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <Edit
                    isShow={showEdit}
                    handleCloseEdit={handleCloseEdit}
                    user={pass}
                    setUsers={props.setUser}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UserList;
