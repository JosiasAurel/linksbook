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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropCollectionToCollection = exports.collectionWithName = exports.removeLink = exports.dropLinkToCollection = exports.deleteCollection = exports.updateCollection = exports.getAllCollections = exports.getCollection = exports.createCollection = void 0;
var index_1 = require("./index");
// collections database table
var collections = index_1.deta.Base("collections");
function createCollection(name, owner, returnData, parent) {
    return __awaiter(this, void 0, void 0, function () {
        var newCollection;
        return __generator(this, function (_a) {
            try {
                newCollection = collections.put({
                    name: name,
                    owner: owner,
                    links: [],
                    children: [],
                    parent: parent ? parent : "NONE"
                }, index_1.generateModelKey());
                if (returnData) {
                    return [2 /*return*/, newCollection];
                }
                return [2 /*return*/, { status: "Success" }];
            }
            catch (error) {
                return [2 /*return*/, { status: "Failed" }];
            }
            return [2 /*return*/];
        });
    });
}
exports.createCollection = createCollection;
function getCollection(collectionId) {
    return __awaiter(this, void 0, void 0, function () {
        var collection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, collections.get(collectionId)];
                case 1:
                    collection = _a.sent();
                    return [2 /*return*/, collection];
            }
        });
    });
}
exports.getCollection = getCollection;
function getAllCollections(owner) {
    return __awaiter(this, void 0, void 0, function () {
        var fetchedCollectionsRes, fetchedCollectionsItems, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, collections.fetch({ "owner": owner })];
                case 1:
                    fetchedCollectionsRes = _a.sent();
                    return [4 /*yield*/, fetchedCollectionsRes.items];
                case 2:
                    fetchedCollectionsItems = _a.sent();
                    return [2 /*return*/, fetchedCollectionsItems];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, { status: "Failed" }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAllCollections = getAllCollections;
function updateCollection(_a) {
    var name = _a.name, links = _a.links, children = _a.children, id = _a.id;
    return __awaiter(this, void 0, void 0, function () {
        var thisCollection;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getCollection(id)];
                case 1:
                    thisCollection = _b.sent();
                    try {
                        collections.update({
                            name: name && name !== "" ? name : thisCollection.name,
                            links: links && (links.length > 0) ? links : thisCollection.links,
                            children: children && (children.length > 0) ? children : thisCollection.children
                        }, id);
                        return [2 /*return*/, "Success"];
                    }
                    catch (error) {
                        return [2 /*return*/, "Failed"];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateCollection = updateCollection;
function deleteCollection(collectionId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, collections.delete(collectionId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, "Done"];
            }
        });
    });
}
exports.deleteCollection = deleteCollection;
function dropLinkToCollection(collectionId, linkId) {
    return __awaiter(this, void 0, void 0, function () {
        var currentCollection, thisCollection, newLinks, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getCollection(collectionId)];
                case 1:
                    currentCollection = _b.sent();
                    if (linkId in currentCollection.links) {
                        return [2 /*return*/, "Success"];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, collections.get(collectionId)];
                case 3:
                    thisCollection = _b.sent();
                    newLinks = __spread(new Set(__spread(thisCollection === null || thisCollection === void 0 ? void 0 : thisCollection.links, [linkId])));
                    collections.update({
                        links: newLinks
                    }, collectionId);
                    return [2 /*return*/, "Success"];
                case 4:
                    _a = _b.sent();
                    return [2 /*return*/, "Failed"];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.dropLinkToCollection = dropLinkToCollection;
function dropCollectionToCollection(collectionId, childCollectionId) {
    return __awaiter(this, void 0, void 0, function () {
        var currentCollection, thisCollection, newChildren, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getCollection(collectionId)];
                case 1:
                    currentCollection = _b.sent();
                    if (childCollectionId in currentCollection.links) {
                        return [2 /*return*/, "Success"];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, collections.get(collectionId)];
                case 3:
                    thisCollection = _b.sent();
                    newChildren = __spread(new Set(__spread(thisCollection === null || thisCollection === void 0 ? void 0 : thisCollection.children, [childCollectionId])));
                    collections.update({
                        children: newChildren
                    }, collectionId);
                    return [2 /*return*/, "Success"];
                case 4:
                    _a = _b.sent();
                    return [2 /*return*/, "Failed"];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.dropCollectionToCollection = dropCollectionToCollection;
function removeLink(collectionId, linkId) {
    return __awaiter(this, void 0, void 0, function () {
        var currentCollection, newLinksList, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getCollection(collectionId)];
                case 1:
                    currentCollection = _b.sent();
                    newLinksList = currentCollection.links.filter(function (link) { return link !== linkId; });
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    // Update only the list of links
                    return [4 /*yield*/, updateCollection({
                            name: "",
                            children: [],
                            id: collectionId,
                            links: newLinksList
                        })];
                case 3:
                    // Update only the list of links
                    _b.sent();
                    return [2 /*return*/, "Success"];
                case 4:
                    _a = _b.sent();
                    return [2 /*return*/, "Failed"];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.removeLink = removeLink;
function collectionWithName(name, owner, data) {
    return __awaiter(this, void 0, void 0, function () {
        var collection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, collections.fetch({ name: name, owner: owner })];
                case 1: return [4 /*yield*/, (_a.sent()).items];
                case 2:
                    collection = _a.sent();
                    if (collection.length === 0) {
                        return [2 /*return*/, false];
                    }
                    if (data) {
                        return [2 /*return*/, collection[0]];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.collectionWithName = collectionWithName;
