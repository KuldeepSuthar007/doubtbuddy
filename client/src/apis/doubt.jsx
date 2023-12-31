import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createDoubt = async (doubtData) => {
  try {
    const reqUrl = `${backendUrl}doubt/createDoubt`;
    const response = await axios.post(reqUrl, doubtData);
    return response.data;
  } catch (error) {
    console.error("Error during doubt creation:", error);
    throw error;
  }
};
