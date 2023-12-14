import axios from "axios";
import { BASE_URL } from "../constant";

export async function authenticate(requestBody) {
  const res = await axios.post(`${BASE_URL}/users/login`, requestBody);
  return res.data.user;
}

export async function registerUser(requestBody) {
  const res = await axios.post(`${BASE_URL}/users`, requestBody);
  return res.data.user;
}

export async function getCurrentUser(configs) {
  const res = await axios.get(`${BASE_URL}/user`, configs);
  return res.data.user;
}

export async function updateUser(user, configs) {
  const res = await axios.put(`${BASE_URL}/user`, { user }, configs);
  return res.data.user;
}
