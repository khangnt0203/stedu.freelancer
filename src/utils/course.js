import axios from "axios";
import axiosHelper from "../helpers/axiosHelper";

const CourseAPI = {
  getListSubject: (subject, page) => {
    const url = `/subjects?page_size=10&page=${page}&status=ACTIVE&subjectName=${subject}`;
    return axiosHelper.get(url);
  },
  getListCourse: (className, subjectId, currentPage, pageSize) => {
    const url = `/courses?page_size=${pageSize}&page=${currentPage}&className=${className}&subjectId=${subjectId}&status=ACTIVE`;
    return axiosHelper.get(url);
  },
  getSubjectById: (subjectId) => {
    const url = `/subjects?page_size=50&page=1&ids=${subjectId}`;
    return axiosHelper.get(url);
  },
  createSubject: (params) => {
    const url = `/subjects`;
    return axiosHelper.post(url, params);
  },
  updateSubject: (params) => {
    const url = `/subjects`;
    return axiosHelper.put(url, params);
  },
  deleteSubject: (subjectId) => {
    const url = `/subjects/${subjectId}`;
    return axiosHelper.delete(url);
  },
  getCourseDetail: (idCourse) => {
    const url = `/courses?ids=${idCourse}&status=ACTIVE`;
    return axiosHelper.get(url);
  },
  getListCourseByTeacherId: (teacherId, pageSize, pageLoad) => {
    const url = `/courses?page_size=${pageSize}&page=${pageLoad}&teacherId=${teacherId}&status=ACTIVE`;
    return axiosHelper.get(url);
  },
  uploadImage: (file) => {
    const url = `/images`;
    return axios.post(process.env.REACT_APP_API_URL + url, file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteImage: (path) => {
    const url = `/images?url=${path}`;
    return axiosHelper.delete(url);
  },
  createCourse: (params) => {
    const url = `/courses`;
    return axiosHelper.post(url, params);
  },
  editCourse: (params) => {
    const url = `/courses`;
    return axiosHelper.put(url, params);
  },
  getCourse: (id) => {
    const url = `/courses?page_size=50&page=1&ids=${id}`;
    return axiosHelper.get(url);
  },
  deleteCourse: (courseId) => {
    const url = `/courses/${courseId}`;
    return axiosHelper.delete(url);
  },
  getListCourseDetailsByStudentId: (studentId, page) => {
    const url = `/course-details?page_size=5&page=${page}&studentId=${studentId}`;
    return axiosHelper.get(url);
  },
  getCourseDetailById: (courseId) => {
    const url = `/course-details?page_size=50&page=1&courseId=${courseId}`;
    return axiosHelper.get(url);
  },
  startCourse: (courseId) => {
    const url = `/course-details/start/${courseId}`;
    return axiosHelper.put(url);
  },
  finishCourse: (courseId) => {
    const url = `/course-details/finish/${courseId}`;
    return axiosHelper.put(url);
  },
};

export default CourseAPI;
