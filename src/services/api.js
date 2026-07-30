import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 8000,
});

export const fetchDashboardData = async () => {
  return {
    posts: [],
    users: []
  };
};

export const uploadDocument = async ({ file }) => {

  const formData = new FormData();

  formData.append("file", file);

  const token = localStorage.getItem("token");

  const response = await api.post(
    "/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};

export default api;
