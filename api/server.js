const express = require("express");

const AccountsRouter = require('../accounts/accountsRouter')

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", AccountsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: "running" })
})


module.exports = server;
