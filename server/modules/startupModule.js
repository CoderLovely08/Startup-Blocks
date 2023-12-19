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
