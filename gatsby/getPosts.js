const axios = require('axios')

// require('dotenv').config({
//   path: `.env.${process.env.NODE_ENV}`,
// })

const API_BASE_URL = 'https://cdn.contentful.com'
const API_SPACE_ID = '49fdbwmpdowy'
const API_TOKEN = '63caeb300ae46255595611c480207a0e43d1fd688af238a1020b8ec0985ff826'

// const { API_BASE_URL, API_SPACE_ID, API_TOKEN } = process.env

const getPosts = async (contentType) => {
  const POST_URL = `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries`
  const res = await axios
    .get(POST_URL, {
      params: {
        content_type: contentType,
        access_token: API_TOKEN,
      },
    })
    .catch((err) => {
      console.log(err)
    })
  return res
}

if (API_SPACE_ID && API_TOKEN) {
  module.exports = getPosts
}
