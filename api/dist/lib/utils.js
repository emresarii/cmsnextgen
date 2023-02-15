"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieExtractor = void 0;
var cookieExtractor = function (req) {
    var jwt = null;
    if (req && req.cookies) {
        jwt = req.cookies["jwt"];
    }
    return jwt;
};
exports.cookieExtractor = cookieExtractor;
