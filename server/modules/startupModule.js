import pool from "../config/dbConfig.js";

export const getAllStartups = async (searchString, page, pageSize, filter) => {
  try {
    let queryText = "SELECT * FROM StartupInfo WHERE 1=1 ";
    const queryParams = [];

    // Check if there's a search string
    if (searchString) {
      // If there's a search string, add a WHERE clause to the query
      queryText += ` AND (startup_name ILIKE $1 
        OR startup_industry_vertical ILIKE $1 
        OR startup_sub_vertical ILIKE $1 
      OR startup_city ILIKE $1 
      OR startup_investor_name ILIKE $1 )
      `;
      queryParams.push(`%${searchString}%`);
    }

    if (filter) {
      queryText += ` AND startup_investment_type ILIKE $${
        queryParams.length + 1
      }`;
      queryParams.push(`%${filter}%`);
    }

    // Implement pagination
    const offset = (page - 1) * pageSize;
    queryText += ` LIMIT $${queryParams.length + 1} OFFSET $${
      queryParams.length + 2
    }`;
    queryParams.push(pageSize, offset);

    const query = {
      text: queryText,
      values: queryParams,
    };

    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(`Error in getAllStartups() call: ${error}`);
    return [];
  }
};

/**
 * Get all distinct investment types from the StartupInfo table.
 * @returns {Array} An array containing distinct investment types.
 */
export const getAllInvestmentTypes = async () => {
  try {
    const query = {
      text: `SELECT DISTINCT startup_investment_type FROM StartupInfo`,
    };
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(`Error in getAllInvestmentTypes() call: ${error}`);
    return [];
  }
};

/**
 * Add a new startup item to the StartupInfo table.
 * @param {string} startupCity - The city where the startup is located.
 * @param {string} startupDate - The date the startup was established.
 * @param {number} startupFundingAmount - The funding amount for the startup.
 * @param {string} startupIndustryVertical - The industry vertical of the startup.
 * @param {string} startupInvestmentType - The type of investment for the startup.
 * @param {string} startupInvestorName - The name of the investor in the startup.
 * @param {string} startupName - The name of the startup.
 * @param {string} startupRemarks - Remarks or additional information about the startup.
 * @param {string} startupSubVertical - The sub-vertical of the startup.
 * @param {string} userId - The ID of the user associated with the startup.
 * @returns {boolean} True if the startup item was added successfully, false otherwise.
 */
export const addNewStartupItem = async (
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
) => {
  try {
    const query = {
      text: `
      INSERT INTO StartupInfo(
        startup_name,
        startup_industry_vertical,
        startup_sub_vertical,
        startup_city,
        startup_investor_name,
        startup_investment_type,
        startup_funding,
        startup_date,
        startup_remarks,
        user_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      values: [
        startupName,
        startupIndustryVertical,
        startupSubVertical,
        startupCity,
        startupInvestorName,
        startupInvestmentType,
        startupFundingAmount,
        startupDate,
        startupRemarks,
        userId,
      ],
    };

    const { rowCount } = await pool.query(query);
    return rowCount === 1;
  } catch (error) {
    console.error(`Error in addNewStartupItem() call: ${error}`);
    return false;
  }
};

