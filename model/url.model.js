"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const urlSchema = new mongoose_1.default.Schema({
    // userId: {type: String, required: true},
    longURL: { type: String, required: true, unique: true },
    shortURL: { type: String, required: true, unique: true },
    integerId: { type: Number, required: true, unique: true },
}, {
    timestamps: true,
});
const URL = mongoose_1.default.model("Mapping", urlSchema);
exports.default = URL;
