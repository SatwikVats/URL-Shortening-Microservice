"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const urlMappingSchema = new mongoose_1.default.Schema({
    longURL: { type: String, required: true, unique: true },
    uniqueId: { type: Number, required: true, unique: true },
}, {
    timestamps: true,
});
const Mapping = mongoose_1.default.model("Mapping", urlMappingSchema);
exports.default = Mapping;
