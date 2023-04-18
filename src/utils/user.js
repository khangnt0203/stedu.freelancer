import axiosHelper from "../helpers/axiosHelper";

const UserAPI = {
  getUser: (id) => {
    const url = `/users?page_size=50&page=1&status=ACTIVE&ids=${id}`;
    return axiosHelper.get(url);
  },
  getListRegister: (page) => {
    const url = `/users?page_size=5&page=${page}&status=INACTIVE`;
    return axiosHelper.get(url);
  },
  getUserById: (id) => {
    const url = `/users?page_size=50&page=1&status=INACTIVE&ids=${id}`;
    return axiosHelper.get(url);
  },
  editUser : (params) =>{
const url = `/users`
return axiosHelper.put(url,params)
  }
};
export default UserAPI;
