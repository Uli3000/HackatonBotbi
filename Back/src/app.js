const express = require("express");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const clienteRoutes = require("./routes/clienteRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clientes", clienteRoutes);

module.exports = app;
