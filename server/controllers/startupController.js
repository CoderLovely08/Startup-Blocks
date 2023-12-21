import {
  addNewStartupItem,
  getAllInvestmentTypes,
  getAllStartups,
} from "../modules/startupModule.js";

/**
 * Fetch all startups based on search, pagination, and filter criteria.
 * @route GET /startups
 * @param {string} search - The search string for filtering startup names.
 * @param {number} page - The page number for pagination (default: 1).
 * @param {number} pageSize - The number of startups per page (default: 10).
 * @param {string} filter - The filter criteria for startup investment types.
 * @returns {object} - The response JSON containing startup data.
 */
export const fetchAllStartups = async (req, res) => {
  try {
    const { search, page = 1, pageSize = 10, filter } = req.query;

    const result = await getAllStartups(search, page, pageSize, filter);

    res.status(200).json({
      statusCode: 200,
      message: "Fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(`Error in GET /startups route: ${error}`);
    // Log the error and respond with a 500 Internal Server Error
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Fetch all unique investment types for startups.
 * @route GET /investments
 * @returns {object} - The response JSON containing investment type data.
 */
export const fetchAllDomain = async (req, res) => {
  try {
    const result = await getAllInvestmentTypes();

    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
      message: "Fetched successfully",
    });
  } catch (error) {
    console.error(`Error in GET /investments route: ${error}`);
    // Log the error and respond with a 500 Internal Server Error
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Create a new startup item based on the provided information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const createNewStartupItem = async (req, res) => {
  try {
    // Destructure startupInfo from the request body
    const {
      startupCity,
      startupDate,
      startupFundingAmount,
      startupIndustryVertical,
      startupInvestmentType,
      startupInvestorName,
      startupName,
      startupRemarks,
      startupSubVertical,
    } = req.body.startupInfo;

    // Get the userId from the authenticated user in the request
    const userId = req.user?.userId;

    // Call the function to add a new startup item to the database
    const isItemCreated = await addNewStartupItem(
      startupCity,
      startupDate,
      startupFundingAmount,
      startupIndustryVertical,
      startupInvestmentType,
      startupInvestorName,
      startupName,
      startupRemarks,
      startupSubVertical,
      userId
    );

    // Respond based on whether the item was created successfully
    res.status(isItemCreated ? 201 : 422).json({
      success: isItemCreated,
      message: isItemCreated
        ? "Post added successfully"
        : "Unable to post right now",
    });
  } catch (error) {
    console.error(`Error in POST /add route: ${error}`);
    // Log the error and respond with a 500 Internal Server Error
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
