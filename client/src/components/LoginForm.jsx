import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { enqueueSnackbar } from "notistack";
import { loginUser } from "../service";
import { useAuth } from "../context/AuthContext";
import PageLoading from "./PageLoading";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const form = useRef();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsPageLoading(true);
    const result = await loginUser(data.user_email, data.user_password);

    if (result.success) {
      enqueueSnackbar(result.data?.message, {
        variant: result.loginTrue ? "success" : "error",
      });
      login(result.data.userName);
      setIsPageLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsPageLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-1/3 max-sm:w-full justify-center items-center p-4 my-6 mx-4 border shadow-xl rounded-xl">
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
            name="user_email"
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="user_password"
            name="user_password"
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
          Submit
        </button>

        <p className="font-bold text-sm text-slate-gray text-center">
          Don't have an account?{" "}
          <span className="text-cyan-500 underline">
            <Link to={"/register"}>Register</Link>
          </span>
        </p>
      </form>

      {isPageLoading && <PageLoading />}
    </div>
  );
};

export default LoginForm;
