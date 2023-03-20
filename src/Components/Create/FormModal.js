import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from '../../axios/axios';
import swal from 'sweetalert';
Modal.setAppElement('#root');

const FormModal = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors({ ...errors, name: '' }); // clear error message
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' }); // clear error message
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, message: '' }); // clear error message
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate form fields
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 7) {
      errors.password = 'Password must be at least 8 characters';
    }
  
    if (Object.keys(errors).length > 0) {
      let errorList = '';
      Object.values(errors).forEach((msg) => {
        errorList += `${msg}\n`;
      });
      swal('Validation Error', errorList, 'error');
      setErrors(errors);
      return;
    }
  
    // Send form data to server
    setSubmitting(true);
    axios.post('/admin/add_User', {
        username: name,
        email: email,
        password: password,
      },{headers:{"x-access-admintoken":localStorage.getItem("admintoken")}})
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 'success') {
          swal('Success', response.data.message, 'success');
          setName('');
          setEmail('');
          setPassword('');
          onRequestClose(); // Close modal
        } else {
          swal('Error', response.data.message, 'error');
        }
      })
      .catch((error) => {
        console.error(error);
        swal('Error', 'An error occurred. Please try again later.', 'error');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
    
    >
        <div className='flex justify-center mt-[15%]'>
        <div className='border p-20 border-zinc-500 bg-gradient-to-l from-amber-300 to-cyan-300'>
            <h1 className='text-center text-3xl font-bold font-sans text-yellow-800'>Create A User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={`appearance-none border ${
              errors.name ? 'border-red-500' : 'border-green-700'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter E-mail"
              onChange={handleEmailChange}
              className={`appearance-none border rounded w-full py-2 px-3 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-bold mb-2">
              Password
            </label>
            <input
              id="message"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              className={`appearance-none border rounded w-full py-2 px-3 ${
                errors.message ? 'border-red-500' : ''
              }`}
            ></input>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Create'}
</button>
</form>
</div>
</div>
</Modal>
);
};

export default FormModal;
