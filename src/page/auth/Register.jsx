import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password ต้องมีมากกว่า 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });



const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const user = useEcomStore((s) => s.user);
  const actionRegister = useEcomStore((s) => s.actionRegister);
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleOnChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (data) => {

    actionRegister(fromData);
    toast.success("Register Successfully");
    navigate("/login");
  };

  console.log(passwordScore);
  

  return (
    <div
      className="min-h-screen flex 
    items-center justify-center
     bg-gray-100"
    >
      <div className="w-full shadow-md bg-white p-8 max-w-md rounded-2xl">
        <h1 className="text-2xl text-center my-4 font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                {...register("email")}
                type="email"
                onChange={handleOnChange}
                placeholder="Email"
                className={`w-full px-3 py-2 rounded-2xl shadow-md 
        border border-gray-200 focus:outline-none 
        focus:ring-2 focus:ring-blue-300 focus:border-transparent
        ${errors.email && " border-red-300"}
        `}
              />
              {errors.email && (
                <p className="text-red-500 text-sm px-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                onChange={handleOnChange}
                placeholder="password"
                className={`w-full px-3 py-2 rounded-2xl shadow-md 
          border border-gray-200 focus:outline-none 
          focus:ring-2 focus:ring-blue-300 focus:border-transparent
          ${errors.password && " border-red-300"}
          `}
              />
              {errors.password && (
                <p className="text-red-500 text-sm px-2">
                  {errors.password.message}
                </p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span className="w-1/5 px-1" key={index}>
                      <div
                        className={`rounded h-2 ${
                          passwordScore <= 2
                            ? "bg-red-200"
                            : passwordScore < 4
                            ? "bg-yellow-200"
                            : "bg-green-200"
                        }`}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className={`w-full px-3 py-2 rounded-2xl shadow-md 
        border border-gray-200 focus:outline-none 
        focus:ring-2 focus:ring-blue-300 focus:border-transparent
        ${errors.confirmPassword && " border-red-300"}
        `}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>


            {watch().email && watch().password
            ? (
              <button
                // onClick={onSubmit}
                className="bg-blue-500 text-white 
        rounded-2xl py-2  w-full shadow-2xl hover:bg-blue-700 hover:scale-105 hover:duration-500"
              >
                Register
              </button>
            ) : (
              <button
                className="bg-gray-500 text-white 
      rounded-2xl py-2  w-full shadow-2xl hover:bg-gray-700 hover:scale-105 hover:duration-500"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
