"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModelKey = exports.deta = void 0;
var deta_1 = require("deta");
var nanoid_1 = require("nanoid");
var deta = deta_1.Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF");
exports.deta = deta;
function generateModelKey() {
    var modelKey = nanoid_1.nanoid(12);
    return modelKey;
}
exports.generateModelKey = generateModelKey;
