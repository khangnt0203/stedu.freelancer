import axiosHelper from "../helpers/axiosHelper";

// const BASE_URL = "https://minhtn-api.mirrorfly.com/api/v1";
const ChatAPI = {
    getListChat: () => {
        const url = '/chat-rooms';
        return axiosHelper.get(url);
    },
    getListMessage: (roomId) => {
        const url = `/chat-rooms/${roomId}/messages?page=1&page_size=20`;
        return axiosHelper.get(url);
    }


    // login: (usernameChat, passwordChat) => {
    //     const url = BASE_URL + "/login";
    //     const body = { username: usernameChat, password: passwordChat };
    //     return axiosHelper.post(url, body);
    // },
    // setToken: (token) => {
    //     sessionStorage.setItem("tokenMirror", token);
    // },
    // getToken: () => {
    //     return sessionStorage.getItem("tokenMirror");
    // },
}

export default ChatAPI