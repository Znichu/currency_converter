const { instance } = require("./client");

const exchangerateAPI = {
  getCurrentData(baseCurrency, symbols, amount) {
    return instance
      .get(`/latest?base=${baseCurrency}&symbols=${symbols}&amount=${amount}`)
      .then((res) => res.data);
  },
  getSymbols() {
    return instance.get("/symbols").then((res) => res.data);
  },
};

module.exports = exchangerateAPI;
