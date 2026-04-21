import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

const createExpense = async (data) => {
  const response = await api.post("/expense", data);
  console.log(response);
  return response;
};

const getExpense = async () => {
  const response = await api.get("/expense");
  console.log(response);
  return response;
};

const getOneExpense = async (id) => {
  const response = await api.get(`/expense/${id}`);
  console.log(response);
  return response;
};

const deleteExpense = async (id) => {
  const response = await api.delete(`/expense/${id}`);
  console.log(response);
  return response;
};

const updateExpense = async (id, data) => {
  const response = await api.put(`/expense/${id}`, data);
  console.log(response);
  return response;
};

const getSummary = async (userId, months) => {
  return await axios.get(`http://localhost:8080/api/expense/${userId}/summary/${months}`);
};

const getAnomalies = async (uid) => {
  const response = await api.get(`/expense/anomalies/${uid}`);
  console.log(response);
  return response;
};

export {
  createExpense,
  getExpense,
  getOneExpense,
  deleteExpense,
  updateExpense,
  getSummary,
  getAnomalies,
};
