"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3500;
app.use(express_1.default.json()); // Middleware
app.use((0, cors_1.default)()); // Enable CORS (Cross Origin Resource Sharing) to make the API accessible to frontend.
app.get('/', (req, res) => {
    res.send('Hello');
});
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to the DB');
    app.listen(process.env.PORT || PORT, () => {
        console.log('Server is up and running');
    });
});
