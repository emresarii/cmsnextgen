"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var prisma_1 = __importDefault(require("../lib/prisma"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var passport_1 = __importDefault(require("passport"));
var auth_1 = __importDefault(require("../auth/auth"));
require("../auth/passport");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
passport_1.default.serializeUser(function (user, done) {
    console.log(user);
    return done(null, user);
});
passport_1.default.deserializeUser(function (id, done) {
    console.log(id);
    return done(null, prisma_1.default.user.findFirst({ where: { email: id } }));
});
app.use("/", auth_1.default);
app.use('/user', passport_1.default.authenticate('jwt', { session: false }), function (req, res) { res.send("Not expired"); });
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:".concat(port));
});
