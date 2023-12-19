import { getAllInvestmentTypes, getAllStartups } from "../modules/startupModule.js";

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

    res.json({
      message: "Not working",
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

    res.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error(`Error in GET /investments route: ${error}`);

    res.json({
      message: "Not working",
    });
  }
};
