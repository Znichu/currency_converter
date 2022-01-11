import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3242/api",
});

export const currencyConverterAPI = {
  getData: (base, symbols, amount) =>
    instance
      .get(`/converter?base=${base}&symbols=${symbols}&amount=${amount}`)
      .then((res) => res.data),

  getSymbols: () => instance.get("/symbols").then((res) => res.data),
};
