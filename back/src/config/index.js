const dotEnv = require("dotenv");
const { object, number, string } = require("yup");

dotEnv.config();

const schema = object({
  PORT: number().required(),
  NODE_ENV: string().required(),
  CURRENCY_CONVERTOR_URL: string().required(),
});

const schemaValid = schema.validateSync(process.env);

if (!schemaValid) {
  process.exit(1);
}

const config = {
  port: schemaValid.PORT,
  currentEnv: schemaValid.NODE_ENV,
  currencyConverterURL: schemaValid.CURRENCY_CONVERTOR_URL,
};

module.exports = config;
