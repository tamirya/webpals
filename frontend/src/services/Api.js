import axios from "axios";
/**
 * API - handle all http requests
 */

export const login = async (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await axios.post(`/api/login`, data).catch((error) => {
      if (typeof error === "string") {
        return reject(error);
      }
      return reject(error?.response?.data);
    });
    resolve(res?.data);
  });
};

export const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    const access_token = localStorage.getItem("access_token");
    const res = await axios
      .get(`/api/users`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .catch((error) => {
        console.log("error:", error);
        if (typeof error === "string") {
          return reject(error);
        }
        return reject(error?.response);
      });
    resolve(res?.data);
  });
};

export const updateUser = (row) => {
  return new Promise(async (resolve, reject) => {
    const access_token = localStorage.getItem("access_token");
    const data = Object.keys(row)
      .map((key) => `${key}=${encodeURIComponent(row[key])}`)
      .join("&");
    const res = await axios
      .put(`/api/users/${row.user_id}`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .catch((error) => {
        console.log("error:", error);
        if (typeof error === "string") {
          return reject(error);
        }
        return reject(error?.response);
      });
    resolve(res?.data);
  });
};

export const deleteUser = (row) => {
  return new Promise(async (resolve, reject) => {
    const access_token = localStorage.getItem("access_token");
    const res = await axios
      .delete(`/api/users/${row.user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .catch((error) => {
        console.log("error:", error);
        return reject(error?.response);
      });
    resolve(res?.data);
  });
};

export const createUser = (row) => {
  return new Promise(async (resolve, reject) => {
    const access_token = localStorage.getItem("access_token");
    const res = await axios
      .post(`/api/users`, row, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .catch((error) => {
        console.log("error:", error);
        return reject(error?.response);
      });
    resolve(res?.data);
  });
};
