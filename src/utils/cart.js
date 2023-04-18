import axiosHelper from "../helpers/axiosHelper";

const CartAPI = {
  add: (courseId) => {
    const url = `/shopping-carts/add`;
    return axiosHelper.post(url, courseId);
  },
  remove: (courseId) => {
    const url = `/shopping-carts/remove`;
    return axiosHelper.post(url, courseId);
  },
  getCart: () => {
    const url = `/shopping-carts`;
    return axiosHelper.get(url);
  },

};

export default CartAPI;
