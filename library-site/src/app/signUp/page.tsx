'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useCreateUserProvider } from '@/hooks';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  const { useCreateUser } = useCreateUserProvider();
  const { user, load: sendUser} = useCreateUser();

  const [isSubmitted, setIsSubmitted] = useState(false); // Add state for form submission

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const user:{userName: string, userLastName: string, id: string} = {
      userName:formData.firstName, 
      userLastName:formData.lastName,
      id: "none"
    };
    sendUser(user);
    setIsSubmitted(true); // Set isSubmitted to true
  };
  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      {isSubmitted ? (<Link href='/'>
      <button
      className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mx-auto"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 3a7 7 0 00-4.95 11.95l4.95-4.95v3.05A3.5 3.5 0 0114.5 14l4.95-4.95A7 7 0 0010 3z" clipRule="evenodd" />
          </svg>
        </span>
        Sign in
      </button>
      </Link>
      ) : (
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 rounded-xl pb-8 mb-4">
    <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    <div className="flex items-center justify-center mt-6">
      <button
        type="submit"
        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-6"
      >
        Create Account
      </button>
      <Link href='/'>
      <button
        type="submit"
        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Already have an account ? 
      </button>
      </Link>
    </div>
    </div>
    </form>
      )}
    </div>
  );
};


export default RegisterForm;