import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const actionRegister = useEcomStore((state) => state.actionRegister);


  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const LoginSuccess = actionLogin(form);
    if (LoginSuccess) {
      toast.success("Welcome My Shopper", {
        position: "top-center",
      });
      navigate("/");
    } else {
      toast.warning("username or password invalid...", {
        position: "top-center",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex 
    items-center justify-center
     bg-gray-100"
    >
      <div
        className="w-full shadow-md
       bg-white p-8 max-w-md rounded-2xl"
      >
        <h1 className="text-2xl text-center my-4 font-bold">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              onChange={handleOnChange}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 rounded-2xl shadow-md 
        border border-gray-200 focus:outline-none 
        focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />

            <input
              onChange={handleOnChange}
              name="password"
              type="password"
              className="w-full px-3 py-2 rounded-2xl shadow-md 
        border border-gray-200 focus:outline-none 
        focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />

            <button
              className="bg-blue-500 text-white 
        rounded-2xl py-2  w-full shadow-2xl hover:bg-blue-700 hover:scale-105 hover:duration-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
