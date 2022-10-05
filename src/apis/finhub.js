import axios from "axios";

const KEY = "cctvc8aad3i78dc6tmmgcctvc8aad3i78dc6tmn0";

export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{
        token:KEY
    }
    //cctvc8aad3i78dc6tmmgcctvc8aad3i78dc6tmn0
})
