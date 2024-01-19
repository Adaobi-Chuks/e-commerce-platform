"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const database_config_1 = __importDefault(require("./configs/database.config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const constants_config_1 = require("./configs/constants.config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
    res.status(500).send({
        message: "Something went wrong"
    });
});
// Initialize Sequelize
database_config_1.default
    .authenticate()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Unable to connect to the database', err));
// Define your routes and middleware here
app.use("/api/v1", index_routes_1.default);
// Start the server
app.listen(constants_config_1.PORT, () => {
    console.log(`Server started on port: ${constants_config_1.PORT}`);
});
