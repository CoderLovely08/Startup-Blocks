import { getAllStartups } from "../modules/startup.js";

export const fetchAllStartups = async (req, res) => {
  try {
    const result = await getAllStartups();
    res.status(200).json({
      statusCode: 200,
      message: "Fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(`Error in GET /startup route: ${error}`);
    res.json({
      message: "Not working",
    });
  }
};
