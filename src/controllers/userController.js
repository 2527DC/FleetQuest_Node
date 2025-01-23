import { getusers } from "../service/userServices.js";
export const login = async (req, res) => {
  try {
    const result = await getusers(req);

    // Handle responses based on the result from the service
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        data: result.user, // Send user data if authenticated
        token: result.token
      });
    } else {
      // If not successful, return a 401 (Unauthorized) or 404 based on the situation
      const statusCode = result.message === "User not found" ? 404 : 401;
      return res.status(statusCode).json({
        message: result.message,
      
      });
    }
  } catch (error) {
    console.error("Error in getuserController:", error);

    // Send error message with status code 500 (Internal Server Error)
    res.status(500).json({
      message: "An error occurred, couldn't fetch the data",
    });
  }
};
