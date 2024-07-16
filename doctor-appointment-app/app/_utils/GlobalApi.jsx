const { default: axios } = require("axios")



const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY
const axiosClient = axios.create(
    {
        baseURL: 'http://localhost:1337/api',
        header: {
            'Authorization':`Bearer ${API_KEY}`
        }
   }
)
const getCategory = () => axiosClient.get('categories?populate=*');
const getDoctorList = () => axiosClient.get('doctors?populate=*');
const getDoctorbyCategory = (category) => axiosClient.get('doctors?filters[categories][Name][$in]=' + category + "&populate=*")

const getDoctorbyId = (id) => axiosClient.get('/doctors/'+id+"?populate=*")
export default { 
    getCategory, getDoctorList,getDoctorbyCategory,getDoctorbyId
}