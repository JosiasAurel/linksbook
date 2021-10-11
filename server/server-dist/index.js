"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
// load type definitions and resolvers
var typedefs_1 = require("./graphql/typedefs");
var resolvers_1 = require("./graphql/resolvers");
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./utils/auth");
// models...
var links_1 = require("./models/links");
var ext_1 = require("./models/ext");
var port = 5000;
// init express server app
var app = express_1.default();
// Plugins
app.use(cors_1.default());
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.send("LinksBook server working");
});
/* Routes to handle operations by the browser extension */
// Route for saving a link
app.post("/save-link", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, _a, annotation, url, exists, createdLink;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                key = getUserInfo(req).key;
                _a = req.body, annotation = _a.annotation, url = _a.url;
                return [4 /*yield*/, links_1.linkWithUrl(url, key)];
            case 1:
                exists = _b.sent();
                if (exists) {
                    res.json({ status: "Done", msg: "Bookmark Exists" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, links_1.createLink(annotation, url, [], key)];
            case 2:
                createdLink = _b.sent();
                if (createdLink === "Success") {
                    res.json({ status: "Done", msg: "Bookmark Saved" });
                }
                res.json({ status: "Done", msg: "Failed" });
                return [2 /*return*/];
        }
    });
}); });
// route for pushing browser bookmarks
app.post("/sync-bookmarks", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, data, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = getUserInfo(req).key;
                data = req.body;
                return [4 /*yield*/, ext_1.syncBookmarks(data, "NONE", key)];
            case 1:
                result = _a.sent();
                res.json({ msg: result });
                return [2 /*return*/];
        }
    });
}); });
/* Routes for browser extension - End */
function getUserInfo(req) {
    var requestHeaders = req.headers;
    var authorization = requestHeaders === null || requestHeaders === void 0 ? void 0 : requestHeaders.authorization;
    // get the JWT from the request headers
    var authToken = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
    var userInfo = auth_1.authenticateUser(authToken);
    return userInfo;
}
// Create apollo server
var apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: typedefs_1.typeDefinitions,
    resolvers: resolvers_1.resolvers,
    context: function (_a) {
        var req = _a.req;
        // handle request context
        var userInfo = getUserInfo(req);
        return userInfo;
    }
});
// mount apollo server on express
apolloServer.start().then(function (_) { return apolloServer.applyMiddleware({ app: app }); });
app.listen(port, function () { return console.log("Server working on port " + port); });
module.exports = app;
