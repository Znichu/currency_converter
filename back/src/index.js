const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./config/index");
const PORT = config.port || 3000;
const converter = require("./routes/converter");

const server = http.createServer(app);

const main = async () => {
  app.use(cors());
  app.use(express.json());

  app.use("/api", converter);

  server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
