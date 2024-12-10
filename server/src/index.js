import express from "express";
import config from "../config.js";

const App = express();

App.listen(config.port);
