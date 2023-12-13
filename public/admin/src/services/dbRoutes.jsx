import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL + 'api/v1/';

const getData = async (url) => {
  try {
    const data = await axios(url)
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
    console.log({id: idArr})
    const response = axios.delete(deleteImagesUrl, {
      data: {
        id: idArr
      }
    })
    return response
  } catch (e) {
    return e.response
  }
} 

const uploadImages = async (fileObj) => {
  try {
    const uploadImgUrl = API_URL + 'examples/postImages'

    const {imgBefore, imgAfter} = fileObj
    const formData = new FormData()
    formData.append('imgBefore', imgBefore)
    formData.append('imgAfter', imgAfter)
  
    const response = await axios.post(uploadImgUrl, formData)
    
    return response

  } catch (e) {
    return e.response
  }
}

export {
  getImageTable,
  deleteExamples,
  uploadImages,
}