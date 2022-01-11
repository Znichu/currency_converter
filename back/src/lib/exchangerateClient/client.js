const config = require("../../config/index");
const axios = require("axios").default;

const instance = axios.create({
  baseURL: config.currencyConverterURL,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = { instance };
