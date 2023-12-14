import axios from "axios";

import { BASE_URL } from "../constant";

export async function getProfileByUsername(username, configs) {
  const res = await axios.get(`${BASE_URL}/profiles/${username}`, configs);
  return res.data.profile;
}

export async function unfollowProfile(username, configs) {
  const res = await axios.delete(
    `${BASE_URL}/profiles/${username}/follow`,
    configs
  );
  return res.data.profile;
}
export async function followProfile(username, configs) {
  const res = await axios.post(
    `${BASE_URL}/profiles/${username}/follow`,
    {},
    configs
  );
  return res.data.profile;
}
