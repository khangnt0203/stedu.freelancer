import axiosHelper from "../helpers/axiosHelper"

export const CommentAPI = {
    getListComment:(courseId, page)=>{
        const url = `/courses/${courseId}/comments?page=${page}&page_size=5`
        return axiosHelper.get(url)
    },
    createPointCourse:(courseId, point)=>{
        const url = `courses/${courseId}/rating/${point}`;
        return axiosHelper.post(url)
    },
    createComment:(courseId, content)=>{
        const url = `/courses/${courseId}/comments`;
        return axiosHelper.post(url, content)
    }
}