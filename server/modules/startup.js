import pool from "../config/dbConfig.js";

export const getAllStartups = async () => {
  try {
    const query = {
      text: `SELECT * FROM StartupInfo LIMIT 10`,
    };

    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(`Error in getAllStartups() call: ${error}`);
  }
};
