import axios from 'axios'

const api = axios.create({
    baseURL:'https://redlightclub.net'
})

export default api