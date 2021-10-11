"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_SERVICE_URL = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.config();
var AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
exports.AUTH_SERVICE_URL = AUTH_SERVICE_URL;
