export const registerUser = async (req, res) => {
  try {
    res.json({
      route: "Registration",
    });
  } catch (error) {
    res.json({
      error: "Error occured in registration route",
    });
  }
};
