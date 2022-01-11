import "./App.css";
import { Select, Button } from "antd";
import { Row, Col } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  actions,
  getDataFromApi,
  getSymbolsFromApi,
} from "./store/currencyConverter";

import Field from "./components/Field";

const { Option } = Select;

const CURRENCY = "USD";
const AMOUNT = 1;

function App() {
  const dispatch = useDispatch();

  const [isHideSelector, setIsHideSelector] = useState(true);

  const currencies = useSelector((state) => state.currencyConverter.currencies);
  const changeCurrency = useSelector(
    (state) => state.currencyConverter.changeCurrency
  );
  const symbols = useSelector((state) => state.currencyConverter.symbols);

  const keys = Object.keys(currencies);

  useEffect(() => {
    dispatch(getDataFromApi(CURRENCY, keys, AMOUNT));
  }, [dispatch]);

  const onClick = () => {
    dispatch(getSymbolsFromApi());
    setIsHideSelector(false);
  };

  const addCurrency = (value) => {
    setIsHideSelector(true);
    dispatch(actions.addNewCurrency({ [value]: null }));
    dispatch(
      getDataFromApi(
        changeCurrency.currency,
        [...keys, value],
        changeCurrency.amount
      )
    );
  };

  const data = keys.map((key) => (
    <Field
      key={new Date().toISOString() + key}
      currency={key}
      value={currencies[key]}
      symbols={keys}
    />
  ));

  return (
    <div className="App">
      <header className="App-header">
        <Row>
          <Col span={24}>{data}</Col>
          <Col span={12}>
            <Button onClick={onClick} type="primary">
              Add currency
            </Button>
          </Col>
          <Col span={12}>
            {!isHideSelector && (
              <Select
                size="default"
                autoFocus={true}
                style={{ width: 300 }}
                onChange={addCurrency}
              >
                {symbols.map((symbol) => (
                  <Option
                    key={symbol.code}
                  >{`${symbol.code} ${symbol.description}`}</Option>
                ))}
              </Select>
            )}
          </Col>
        </Row>
      </header>
    </div>
  );
}

export default App;
