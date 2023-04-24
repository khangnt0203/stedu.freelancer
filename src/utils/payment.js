import axiosHelper from "../helpers/axiosHelper";

export const PaymentAPI = {
  depositRequest: (amount) => {
    const url = `/payments/deposit-requests?amount=${amount}`;
    return axiosHelper.post(url);
  },
  getListRequest: (page) => {
    const url = `/payments/deposit-requests?page=${page}&page_size=5`;
    return axiosHelper.get(url);
  },
  processRequest: (userId, status) => {
    const url = `/payments/deposit-requests/${userId}?status=${status}`;
    return axiosHelper.put(url);
  },
  getFeeConfig: () => {
    const url = `/configs`;
    return axiosHelper.get(url);
  },
  updateFeeConfig: (percent) => {
    const url = `/configs/transaction/fee?percent=${percent}`;
    return axiosHelper.post(url)
  },
  updateDiscountConfig: (percent) => {
    const url = `/configs/discount?percent=${percent}`;
    return axiosHelper.post(url)
  },
  payment: (params) => {
    const url = `/orders/pay`;
    return axiosHelper.post(url, params);
  },
};
