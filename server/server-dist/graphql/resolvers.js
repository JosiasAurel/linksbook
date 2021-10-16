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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// import model CRUD handlers
var collection_1 = require("../models/collection");
// import link handlers
var links_1 = require("../models/links");
var resolvers = {
    Query: {
        hello: function () {
            return "Hello World";
        },
        user: function (_parent, _args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var name, email, key;
            return __generator(this, function (_a) {
                name = context.name, email = context.email, key = context.key;
                return [2 /*return*/, { name: name, email: email, id: key }];
            });
        }); },
        searchLinks: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var searchedLinks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, links_1.searchLinks(args.search, args.type, context.key)];
                    case 1:
                        searchedLinks = _a.sent();
                        if (typeof links_1.searchLinks !== "string") {
                            return [2 /*return*/, searchedLinks];
                        }
                        else {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/];
                }
            });
        }); }
    },
    User: {
        links: function (parent, _args) { return __awaiter(void 0, void 0, void 0, function () {
            var allLinks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, links_1.getAllLinks(parent.id)];
                    case 1:
                        allLinks = _a.sent();
                        // change link key to link.id to match typedef
                        allLinks.map(function (link) { return link.id = link.key; });
                        return [2 /*return*/, allLinks];
                }
            });
        }); },
        collections: function (parent, _args) { return __awaiter(void 0, void 0, void 0, function () {
            var allCollections;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection_1.getAllCollections(parent.id)];
                    case 1:
                        allCollections = _a.sent();
                        // set collection.id to value of collection.key
                        allCollections.map(function (col) { return col.id = col.key; });
                        return [2 /*return*/, allCollections];
                }
            });
        }); }
    },
    Mutation: {
        createLink: function (parent, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var annotation, tags, url, newLink;
            return __generator(this, function (_a) {
                annotation = args.annotation;
                tags = args.tags;
                url = args.url;
                newLink = links_1.createLink(annotation, url, tags, context.key);
                return [2 /*return*/, { status: newLink }];
            });
        }); },
        updateLink: function (_parent, args, _ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var oldLink, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, links_1.getLink(args.linkId)];
                    case 1:
                        oldLink = _a.sent();
                        if (!(oldLink !== "Failed")) return [3 /*break*/, 3];
                        return [4 /*yield*/, links_1.updateLink(args.linkId, args.annotation ? args.annotation : oldLink.annotation, args.url ? args.url : oldLink.url, args.tags ? args.tags : oldLink.tags, args.note ? args.note : oldLink.note)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, { status: result }];
                    case 3: return [2 /*return*/, { status: "Failed" }];
                }
            });
        }); },
        deleteLink: function (_parent, args, _ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = links_1.deleteLink(args.linkId);
                return [2 /*return*/, { status: result }];
            });
        }); },
        createCollection: function (parent, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var newCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection_1.createCollection(args.name, args.type, ctx.key, args.parent)];
                    case 1:
                        newCollection = _a.sent();
                        return [2 /*return*/, newCollection];
                }
            });
        }); },
        updateCollection: function (parent, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection_1.updateCollection({
                            name: args.name,
                            links: args.links,
                            children: args.children,
                            id: args.collectionId
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { status: result }];
                }
            });
        }); },
        deleteCollection: function (_parent, args) { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection_1.deleteCollection(args.collectionId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { status: result }];
                }
            });
        }); },
        dropLink: function (_parent, args) { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection_1.dropLinkToCollection(args.collectionId, args.linkId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { status: result }];
                }
            });
        }); },
        removeLink: function (_parent, args) { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection_1.removeLink(args.collectionId, args.linkId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { status: result }];
                }
            });
        }); }
    },
    Collection: {
        links: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
            var linksId, links, i, link;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        linksId = parent === null || parent === void 0 ? void 0 : parent.links;
                        links = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < linksId.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, links_1.getLink(linksId[i])];
                    case 2:
                        link = _a.sent();
                        // console.log(link);
                        if (link !== null)
                            links.push(link);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        links.map(function (link) { return link.id = link.key; });
                        // console.log(links)
                        return [2 /*return*/, links];
                }
            });
        }); }
    }
};
exports.resolvers = resolvers;
