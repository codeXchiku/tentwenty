import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth"

interface loginform{
  email: string;
    password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<loginform>({
    email: "",
    password: ""
  });
  
  let navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", loginData);
      if (res.status === 200) {
        storeTokenInLS(res.data.token);
        setLoginData({
          email: "",
          password: ""
        });
        navigate("/monthview", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/monthview", { replace: true });
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
        <p className="text-lg text-center">
          Track your employee working hours with ease.
        </p>
        <div className="mt-10">
          <p>TimeLapse</p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold mb-6">Login</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleInput}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInput}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm text-blue-600">
              <a href="#" className="hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;