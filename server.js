const express = require("express");
const dotenv = require("dotenv");
const identifyRoute = require("./routes/identify");
const { createDatabaseIfNotExists, createSchemaIfNotExists } = require("./db");

dotenv.config();
const app = express();

app.use(express.json());

const startServer = async () => {
  await createDatabaseIfNotExists();  
  await createSchemaIfNotExists();    

  app.use("/", identifyRoute);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
