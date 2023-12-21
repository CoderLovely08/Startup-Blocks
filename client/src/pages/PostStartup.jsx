import axios from "../config/axiosConfig";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PageLoading from "../components/PageLoading";
import {
  BASE_AUTH_URL,
  BASE_STARTUP_URL,
  postNewStartup,
  validateUser,
} from "../service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PostStartup = () => {
  const form = useRef();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  const navigateTo = useNavigate();
  const { login } = useAuth();

  // Check route accessibility
  useEffect(() => {
    // Check if the user is authenticatd to access the route
    const isAuthenticated = async () => {
      const result = await validateUser();
      if (result.success) {
        login(result?.userName);
      } else {
        enqueueSnackbar(result.message, { variant: "info" });
        navigateTo("/login");
      }
    };
    isAuthenticated();

    // Populate dropdown
    const fetchTypes = async () => {
      const filterOptionsData = await axios.get(
        `${BASE_STARTUP_URL}/investments`
      );

      setFilterOptions((prev) =>
        filterOptionsData.data.data.filter(
          (item) => item.startup_investment_type.length > 0
        )
      );
    };
    fetchTypes();

    return;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    setIsPageLoading(true);
    const result = await postNewStartup(data);

    if (result.success) {
      enqueueSnackbar(result.message, {
        variant: result.isPosted ? "success" : "error",
      });
      setIsPageLoading(false);
      navigateTo("/");
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsPageLoading(false);
    }
  };

  return (
    <section className="flex justify-center w-full p-4">
      <div className="w-2/3 max-md:w-full justify-center items-center p-4 my-6 border shadow-xl rounded-xl max-lg:2/3">
        <h3 className="text-2xl font-bold text-center m-2">
          Add Startup Details
        </h3>
        <form
          autoComplete="off"
          ref={form}
          className="w-full grid gap-4 grid-cols-2 max-sm:grid-cols-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Startup Name */}
          <div>
            <input
              type="text"
              id="startupName"
              name="startupName"
              {...register("startupName", {
                required: "Startup Name cannot be empty",
              })}
              className="form-input"
              minLength={4}
              maxLength={30}
              placeholder="Startup Name"
              required="Startup Name cannot be empty"
            />
            {errors["startupName"] && (
              <p className="text-xs text-red-500">
                {errors["startupName"].message}
              </p>
            )}
          </div>
          {/* Startup funding*/}
          <div>
            <input
              type="number"
              id="startupFundingAmount"
              name="startupFundingAmount"
              {...register("startupFundingAmount", {
                required: "Startup Funding amount is required",
              })}
              min={0}
              className="form-input"
              placeholder="Startup Funding Amount"
              required="startupFundingAmount cannot be empty"
            />
            {errors["startupFundingAmount"] && (
              <p className="text-xs text-red-500">
                {errors["startupFundingAmount"].message}
              </p>
            )}
          </div>
          {/* Startup Industry Vertical */}
          <div>
            <input
              type="text"
              id="startupIndustryVertical"
              name="startupIndustryVertical"
              {...register("startupIndustryVertical", {
                required: "Startup Industry Vertical cannot be empty",
              })}
              className="form-input"
              minLength={4}
              maxLength={30}
              placeholder="Startup Industry Vertical"
              required="startupIndustryVertical cannot be empty"
            />
            {errors["startupIndustryVertical"] && (
              <p className="text-xs text-red-500">
                {errors["startupIndustryVertical"].message}
              </p>
            )}
          </div>
          {/* Startup Sub Vertical */}
          <div>
            <input
              type="text"
              id="startupSubVertical"
              name="startupSubVertical"
              {...register("startupSubVertical", {
                required: "Startup Sub Vertical cannot be empty",
              })}
              className="form-input"
              minLength={4}
              maxLength={30}
              placeholder="Startup Sub Vertical"
              required="startupSubVertical cannot be empty"
            />
            {errors["startupSubVertical"] && (
              <p className="text-xs text-red-500">
                {errors["startupSubVertical"].message}
              </p>
            )}
          </div>
          {/* Startup City */}
          <div>
            <input
              type="text"
              id="startupCity"
              name="startupCity"
              {...register("startupCity", {
                required: "Startup City cannot be empty",
              })}
              className="form-input"
              minLength={4}
              maxLength={30}
              placeholder="Startup City"
              required="startupCity cannot be empty"
            />
            {errors["startupCity"] && (
              <p className="text-xs text-red-500">
                {errors["startupCity"].message}
              </p>
            )}
          </div>
          {/* Startup Date*/}
          <div>
            <input
              type="date"
              id="startupDate"
              name="startupDate"
              {...register("startupDate", {
                required: "Startup Date cannot be empty",
              })}
              className="form-input"
              placeholder="Startup Date"
              required="startupDate cannot be empty"
            />
            {errors["startupDate"] && (
              <p className="text-xs text-red-500">
                {errors["startupDate"].message}
              </p>
            )}
          </div>
          {/* Startup Investor*/}
          <div>
            <input
              type="text"
              id="startupInvestorName"
              name="startupInvestorName"
              {...register("startupInvestorName", {
                required: "Startup City cannot be empty",
              })}
              className="form-input"
              minLength={4}
              maxLength={30}
              placeholder="Startup Investor Name"
              required="startupInvestorName cannot be empty"
            />
            {errors["startupInvestorName"] && (
              <p className="text-xs text-red-500">
                {errors["startupInvestorName"].message}
              </p>
            )}
          </div>
          {/* Startup Investment Type */}
          <div>
            <select
              className="form-input"
              required
              id="startupInvestmentType"
              name="startupInvestmentType"
              defaultValue={"Investment Type"}
              {...register("startupInvestmentType", {
                required: "Please select an investment type",
              })}
            >
              <option disabled hidden>
                {"Investment Type"}
              </option>
              {filterOptions.map((item) => (
                <option key={item.startup_investment_type}>
                  {item.startup_investment_type}
                </option>
              ))}
            </select>
            {errors["startupInvestmentType"] && (
              <p className="text-xs text-red-500">
                {errors["startupInvestmentType"].message}
              </p>
            )}
          </div>
          
          {/* Startup Remarks */}
          <textarea
            type="text"
            rows={3}
            minLength={10}
            maxLength={500}
            id="startupRemarks"
            name="startupRemarks"
            {...register("startupRemarks", {
              required: "Kindly enter remarks in 10 characters or more",
            })}
            className="form-input col-span-full"
            placeholder="Enter remakrs about the startup..."
            required="This field cannot be empty"
          />
          {errors["startupRemarks"] && (
            <p className="text-xs text-red-500">
              {errors["startupRemarks"].message}
            </p>
          )}
          <button
            type="submit"
            className="font-palanquin font-bold text-md text-white border border-cyan-500 bg-cyan-500 rounded-md px-4 py-2 shadow-xl my-2 hover:text-cyan-500 hover:bg-white transition w-full col-span-full"
          >
            Submit
          </button>
        </form>
      </div>
      {isPageLoading && <PageLoading />}
    </section>
  );
};

export default PostStartup;
