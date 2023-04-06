import axios from 'axios'

function ajaxGet(url, data) {
  return axios.get(url, data)
}
const AJAX_GET = ajaxGet

export { AJAX_GET }
