import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const studentRegistration = async (formData) => {
  try {
    const reqUrl = `${backendUrl}auth/student/signup`;
    const reqpayLoad = {
      studentid: Date.now(),
      ...formData,
    };
    const response = await axios.post(reqUrl, reqpayLoad);
    return response.data;
  } catch (error) {
    console.error("Error during student registration:", error);
    throw error;
  }
};

export const tutorRegistration = async (formData) => {
  try {
    const reqUrl = `${backendUrl}auth/tutor/signup`;

    const reqpayLoad = {
      tutorid: Date.now(),
      ...formData,
    };
    const response = await axios.post(reqUrl, reqpayLoad);
    return response.data;
  } catch (error) {
    console.error("Error during tutor registration:", error);
    throw error;
  }
};

export const login = async (formData) => {
  if (formData.role === "student") {
    try {
      const reqpayLoad = {
        ...formData,
      };
      const reqUrl = `${backendUrl}auth/student/login`;
      const response = await axios.post(reqUrl, reqpayLoad);
      localStorage.clear();
      localStorage.setItem("token", response.data.jwToken);
      localStorage.setItem("email", response.data.user);
      localStorage.setItem("studentid", response.data.studentunqid);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
  if (formData.role === "tutor") {
    try {
      const reqpayLoad = {
        ...formData,
      };
      const reqUrl = `${backendUrl}auth/tutor/login`;
      const response = await axios.post(reqUrl, reqpayLoad);
      localStorage.clear();
      localStorage.setItem("token", response.data.jwToken);
      localStorage.setItem("email", response.data.user);
      localStorage.setItem("tutorid", response.data.tutorunqid);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
};
