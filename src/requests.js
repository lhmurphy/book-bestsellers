const APIURL = "http://localhost:3000";
const axios = require("axios");
export const getAllDeals = id => axios.get(`${APIURL}/deals/job/${id}`);
export const getAllJobs = () => axios.get(`${APIURL}/deals/jobs`);
export const scrape = data => axios.post(`${APIURL}/deals/scrape`, data);
export const removeJob = id => axios.delete(`${APIURL}/deals/job/${id}`);