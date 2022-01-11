import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { CurrencyConverterReducer } from "./currencyConverter";

const rootReducer = combineReducers({
  currencyConverter: CurrencyConverterReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export let store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
