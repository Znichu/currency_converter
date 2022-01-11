const express = require("express");
const converter = express.Router();
const exchangerateAPI = require("../lib/exchangerateClient/getDataFromExchangerate");

converter.get("/converter", async (req, res) => {
  const base = req.query.base;
  const symbols = req.query.symbols;
  const amount = req.query.amount;

  try {
    const result = await exchangerateAPI.getCurrentData(base, symbols, amount);
    res.json(result.rates);
  } catch (error) {
    res.json({ error: err.message || err.toString() });
  }
});

converter.get("/symbols", async (req, res) => {
  try {
    const result = await exchangerateAPI.getSymbols();
    const symbols = Object.keys(result.symbols).map(
      (key) => result.symbols[key]
    );
    res.json(symbols);
  } catch (error) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = converter;
