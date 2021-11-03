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
var mail_1 = require("@sendgrid/mail");
var deta_1 = require("deta");
var dotenv_1 = require("dotenv");
// config env vars
dotenv_1.config();
var deta = deta_1.Deta(process.env.a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF);
var reminders = deta.Base("reminders");
var sgMail = new mail_1.MailService();
sgMail.setApiKey(process.env.SENDGRID_MAIL_API_KEY);
deta_1.app.lib.cron(function (_event) { return __awaiter(void 0, void 0, void 0, function () {
    var currentDate, allReminders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentDate = new Date().toUTCString();
                return [4 /*yield*/, reminders.fetch()];
            case 1: return [4 /*yield*/, (_a.sent()).items];
            case 2:
                allReminders = _a.sent();
                allReminders.forEach(function (reminder) { return __awaiter(void 0, void 0, void 0, function () {
                    var remindDate, bookmark_1;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                remindDate = new Date(reminder.remindDate).toUTCString();
                                if (!(currentDate >= remindDate)) return [3 /*break*/, 2];
                                return [4 /*yield*/, resolveReminderBookmark(reminder.bookmark)];
                            case 1:
                                bookmark_1 = _b.sent();
                                (_a = reminder.recipients) === null || _a === void 0 ? void 0 : _a.forEach(function (recipient) {
                                    sendReminder(recipient, bookmark_1.annotation, bookmark_1.url);
                                });
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
/* Sending a reminder */
/*
Get a reminder
- Get the id of the bookmark to remind
- Resolve the bookmark
- Set annotation in mail subject
- Include bookmark in URL
*/
function resolveReminderBookmark(linkId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reminders.get(linkId)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function sendReminder(recipient, bookmarkAnnotation, bookmarkURL) {
    return __awaiter(this, void 0, void 0, function () {
        var message, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = {
                        to: recipient,
                        from: "linksbook00@gmail.com",
                        subject: "Reminder : " + bookmarkAnnotation,
                        text: "Reminding you to check out this link -> " + bookmarkURL + "\n    Title: " + bookmarkAnnotation
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sgMail.send(message)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, "Success"];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, "Failed"];
                case 4: return [2 /*return*/];
            }
        });
    });
}
