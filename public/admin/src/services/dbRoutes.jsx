import axios from "axios"
import { API_PASS } from "../utils/consts";

const API_URL = import.meta.env.VITE_API_URL + API_PASS;

const getData = async (url) => {
  try {
    const {data} = await axios.get(url, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    return data
  } catch (e) {
    return e.response
  }
}

const getImageTable = async (offset, limit) => {
  const getImagesUrl = API_URL + 'examples/getImages'
  const imgTable = await getData(getImagesUrl + `?offset=${offset}&limit=${limit}`)
  return imgTable
}

const deleteExamples = async (idArr) => {
  try {
    const deleteImagesUrl = API_URL + 'examples/delete'
    const response = axios.delete(deleteImagesUrl, {
      data: {
        id: idArr
      },
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    console.log(response)
    return response
  } catch (e) {
    return e.response
  }
} 

const uploadImages = async (fileObj) => {
  try {
    const url = API_URL + 'examples/postImages'

    const {imgBefore, imgAfter} = fileObj
    const formData = new FormData()
    formData.append('imgBefore', imgBefore)
    formData.append('imgAfter', imgAfter)

    const response = await axios.post(url, 
      formData,
      {
        headers: {
        authorization: localStorage.getItem("token")
      },
    }
    )
    
    return response

  } catch (e) {
    console.log(e)
    return e.response
  }
}

export {
  getImageTable,
  deleteExamples,
  uploadImages,
}