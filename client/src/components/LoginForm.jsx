import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { SnackbarProvider, enqueueSnackbar } from "notistack";

const LoginForm = () => {
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

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col gap-4 w-1/3 max-sm:w-full justify-center items-center p-4 my-6 mx-4 border shadow-xl rounded-xl">
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
      <h3 className="text-2xl font-bold text-left">Login</h3>
      <form
        ref={form}
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            type="email"
            id="user_email"
            name="user-email"
            {...register("user-email", {
              required: "Email cannot be empty",
            })}
            className="form-input"
            placeholder="Email"
            required="Email cannot be empty"
          />
          {errors["user-email"] && (
            <p className="text-xs text-red-500">
              {errors["user-email"].message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="user_password"
            name="user-password"
            {...register("user-password", {
              required: "Password cannot be empty",
            })}
            className="form-input"
            placeholder="Password"
            required="Password cannot be empty"
          />
          {errors["user-password"] && (
            <p className="text-xs text-red-500">
              {errors["user-password"].message}
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
