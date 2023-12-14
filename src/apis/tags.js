import axios from "axios";
import { BASE_URL } from "../constant";

export async function getTags() {
  const res = await axios.get(`${BASE_URL}/tags`);
  return res.data.tags;
}
