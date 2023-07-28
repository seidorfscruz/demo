import axios from 'axios';


const flowiseApi = axios.create({
    baseURL: 'https://flowise.seidoranalytics.com',
});


export default flowiseApi;