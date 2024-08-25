import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user/register", {
        username,
        password,
        email,
        mobile,
      });
      navigate("/login");
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
      <div className="flex flex-col w-1/4 bg-white rounded-lg p-7 hover:shadow-md">
        <h1 className="mb-10 text-2xl font-semibold text-center">
          Please Register
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
            type="email"
            placeholder="Email_Address"
            className="p-3 my-5 border-b-2 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Mobile Number"
            className="p-3 border-b-2 focus:outline-none"
            id="mobile-input"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
            Register
          </button>
        </form>
        <p className="mt-3 text-xs text-gray-500">
          Already have an Account{" "}
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>{" "}
          here!
        </p>
      </div>
    </div>
  );
};

export default Register;
