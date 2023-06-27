import { configAxios } from "./config.js";

//8e60fc0ddfcd@drmail.in
//70030f4a2a0e@drmail.in



// f705e0649fa6@drmail.in
// A1234@s

//user
//6e86943677f4@drmail.in

export const register = async (data) => {
  try {
    const check = await configAxios.post("Register", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const login = async (data) => {
  try {
    const check = await configAxios.post("Login", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};
export const confirmation = async (id) => {
  try {
    const check = await configAxios.get(`confirmation/${id}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const forgetPassword = async (email) => {
  try {
    const check = await configAxios.get(`forgetPassword/${email}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};
export const resetPassword = async (id, data) => {
  try {
    const check = await configAxios.patch(`forgetPassword/${id}`, data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};


export const changePasswordUser = async ( data) => {
  try {
    const check = await configAxios.patch("user/changePassword", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};
export const getUserData = async () => {
  try {
    const check = await configAxios.get("user");
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const updateUser = async ( data) => {
  try {
    const check = await configAxios.patch("user", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};
export const addProfileImgForUser = async ( data) => {
  try {
    const check = await configAxios.patch("user/ProfileImg", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};


export const getAllUsers = async (page) => {
  try {
    const check = await configAxios.get(`users/?page=${page}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};


export const searchUser = async (name,page) => {
  try {
    const check = await configAxios.get(`users/${name}/?page=${page}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};


export const addUser = async (data) => {
  try {
    const check = await configAxios.post("user", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const softDeleteUser = async (id) => {
  try {
    const check = await configAxios.delete(`users/${id}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};


export const deleteUser = async () => {
  try {
    const check = await configAxios.delete("user");
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};


