import axios from 'axios';

// const omfApiEndpoint = process.env.VUE_APP_OMF_API_ENDPOINT || window.location.origin;

export default axios.create({
    // baseURL: omfApiEndpoint,
    timeout: 30000
  })