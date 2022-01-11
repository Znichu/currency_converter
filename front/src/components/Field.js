import { useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input } from "antd";
import { actions, getDataFromApi } from "../store/currencyConverter";

function Field({ currency, value, symbols }) {
  const dispatch = useDispatch();

  const currencyInput = useRef(null);

  useEffect(() => {
    currencyInput.current.focus();
  }, []);

  const handleOnInputChange = useCallback(
    (event) => {
      const { value, name } = event.target;

      const changeCurrency = {
        currency: name,
        amount: value,
      };

      dispatch(actions.setCurrencyNewValue(changeCurrency));

      const amount = value ? value : 0;
      dispatch(getDataFromApi(name, symbols, amount));
    },
    [value]
  );

  return (
    <>
      <Input
        name={currency}
        value={value}
        suffix={currency}
        onChange={handleOnInputChange}
        ref={currencyInput}
      />
    </>
  );
}

export default Field;
