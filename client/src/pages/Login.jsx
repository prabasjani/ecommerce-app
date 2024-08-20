import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      if (error) {
        alert(error?.response?.data?.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="container flex items-center justify-center px-20 h-[600px]">
      <div className="flex flex-col w-1/4 border-white rounded-md shadow-md p-7">
        <h1 className="mb-10 text-2xl font-semibold text-center">
          Please Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            className="p-3 border-b-2 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 my-5 border-b-2 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-xs text-gray-500">
          If you don't have an Account{" "}
          <Link to="/register" className="text-blue-400 underline">
            Register
          </Link>{" "}
          here!
        </p>
      </div>
    </div>
  );
};

export default Login;
