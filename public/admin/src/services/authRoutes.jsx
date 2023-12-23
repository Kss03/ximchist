import axios from "axios"
import { jwtDecode } from "jwt-decode";

import { API_PASS } from "../utils/consts"


const API_URL = import.meta.env.VITE_API_URL + API_PASS;

export const updateToken = (token) => {
  localStorage.setItem("token", "Bearer " + token)
  return jwtDecode(token)
}

export const login = async (userData) => {
  const url = API_URL + "auth/login";
  const {data} = await axios.post(url, userData)
  return updateToken(data.token)
} 

export const check = async () => {
  const token = localStorage.token
  const url = API_URL + "auth/check";
  const {data} = await axios.get(url, {
    headers: {
      Authorization: token
    }
  })
  return updateToken(data.token)
}