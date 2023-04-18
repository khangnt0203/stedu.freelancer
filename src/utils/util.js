import axiosHelper from "../helpers/axiosHelper";

const Util = {
    isNullOrBlank: (data) => {
        if (data !== null && data.toString().trim() !== "") {
            return true;
        }
        return false;
    }
}

export default Util;