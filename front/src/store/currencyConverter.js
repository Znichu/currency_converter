import { currencyConverterAPI } from "../api/currencyConverterAPI";

let initialState = {
  currencies: {
    USD: null,
    EUR: null,
    RUB: null,
    BYN: null,
  },
  changeCurrency: {
    currency: null,
    amount: 0,
  },
  symbols: [],
};

//Reducer
export const CurrencyConverterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENCY_CONVERTER/SET_DATA": {
      return {
        ...state,
        currencies: { ...action.data },
      };
    }
    case "CURRENCY_CONVERTER/SET_CURRENCY_NEW_VALUE": {
      return {
        ...state,
        changeCurrency: { ...state.changeCurrency, ...action.currencyNewValue },
      };
    }
    case "CURRENCY_CONVERTER/SET_NEW_CURRENCY": {
      return {
        ...state,
        currencies: { ...state.currencies, ...action.newCurrency },
      };
    }
    case "CURRENCY_CONVERTER/SET_SYMBOLS": {
      return {
        ...state,
        symbols: [...action.data],
      };
    }
    default:
      return state;
  }
};

//Action
export const actions = {
  setData: (data) => ({
    type: "CURRENCY_CONVERTER/SET_DATA",
    data,
  }),
  setCurrencyNewValue: (currencyNewValue) => ({
    type: "CURRENCY_CONVERTER/SET_CURRENCY_NEW_VALUE",
    currencyNewValue,
  }),
  setSymbols: (data) => ({
    type: "CURRENCY_CONVERTER/SET_SYMBOLS",
    data,
  }),
  addNewCurrency: (newCurrency) => ({
    type: "CURRENCY_CONVERTER/SET_NEW_CURRENCY",
    newCurrency,
  }),
};

//Thunk
export const getDataFromApi = (base, symbols, amount) => async (dispatch) => {
  try {
    const result = await currencyConverterAPI.getData(base, symbols, amount);
    dispatch(actions.setData(result));
  } catch (e) {
    console.log(e.message);
  }
};

export const getSymbolsFromApi = () => async (dispatch) => {
  try {
    const result = await currencyConverterAPI.getSymbols();
    dispatch(actions.setSymbols(result));
  } catch (e) {
    console.log(e.message);
  }
};
