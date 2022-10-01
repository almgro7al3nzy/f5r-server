const app = require("express")();
const cors = require("cors");
app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("dotenv/config");


import React from "react";
import ReactDOM from "react-dom"; 

import App from "./App";

ReactDOM.render(<App/>,document.querySelector("#root"));

