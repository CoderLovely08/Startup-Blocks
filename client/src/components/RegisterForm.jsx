import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { registerUser } from "../service";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await registerUser(
      data.user_name,
      data.user_email,
      data.user_password
    );

    if (result.success) {
      enqueueSnackbar({
        message: result.data?.message || "Illegal Argument",
        variant: result.data?.success ? "success" : "error",
      });
    } else {
      console.log(result);
      enqueueSnackbar({
        message: "Network Err",
        variant: result.data?.success ? "success" : "error",
      });
    }
  };
  return (
    <div className="flex flex-col gap-4 w-1/3 max-sm:w-full justify-center items-center p-4 my-6 mx-4 border shadow-xl rounded-xl">
      <h3 className="text-2xl font-bold text-left">Register</h3>
      <form
        ref={form}
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name */}
        <div>
          <input
            type="text"
            id="user_name"
            name="user_name"
            minLength={6}
            maxLength={40}
            {...register("user_name", {
              required: "Name field cannot be empty",
            })}
            className="form-input"
            placeholder="Full Name"
            required="Name field cannot be empty"
          />
          {errors["user_name"] && (
            <p className="text-xs text-red-500">
              {errors["user_name"].message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            id="user_email"
            name="user_email"
            minLength={6}
            maxLength={40}
            {...register("user_email", {
              required: "Email cannot be empty",
            })}
            className="form-input"
            placeholder="Email"
            required="Email cannot be empty"
          />
          {errors["user_email"] && (
            <p className="text-xs text-red-500">
              {errors["user_email"].message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="user_password"
            name="user_password"
            minLength={6}
            maxLength={20}
            {...register("user_password", {
              required: "Password cannot be empty",
            })}
            className="form-input"
            placeholder="Password"
            required="Password cannot be empty"
          />
          {errors["user_password"] && (
            <p className="text-xs text-red-500">
              {errors["user_password"].message}
            </p>
          )}
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="font-palanquin font-bold text-md text-white border border-cyan-500 bg-cyan-500 rounded-md px-4 py-2 shadow-xl my-2 hover:text-cyan-500 hover:bg-white transition w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
