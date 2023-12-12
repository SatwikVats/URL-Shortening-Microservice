"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const randomatic = __importStar(require("randomatic"));
const mapping_model_1 = __importDefault(require("../model/mapping.model"));
const url_model_1 = __importDefault(require("../model/url.model"));
const convertIdToShortURL_1 = __importDefault(require("../util/convertIdToShortURL"));
const generateUniqueNumber = () => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueInteger = parseInt(randomatic('0', 6));
    const existingEntry = yield mapping_model_1.default.findOne({ uniqueId: uniqueInteger });
    if (existingEntry) {
        return generateUniqueNumber();
    }
    else {
        return uniqueInteger;
    }
});
const urlHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await Mapping.findOne({longURL: req.body.url});
        // if(result){
        //     const integerId = result.uniqueId;
        //     const shortURL = convertIdToShortURL(integerId);
        //     const urlObject = {
        //         longURL: req.body.url,
        //         integerId: integerId,
        //         shortURL: shortURL,
        //     };
        //     const newURL = new URL(urlObject);
        //     const savedURL = await newURL.save();
        //     res.status(201).json({"data": savedURL, "statusCode": 201, "errorCode": null, "errorMessage": null});
        // } 
        const result = yield url_model_1.default.findOne({ longURL: req.body.url });
        if (result) {
            res.status(200).json({ "data": result, "statusCode": 200, "errorCode": null, "errorMessage": null });
        }
        else {
            const integerId = generateUniqueNumber();
            const shortURL = (0, convertIdToShortURL_1.default)(integerId);
            const urlObject = {
                longURL: req.body.url,
                integerId: integerId,
                shortURL: shortURL,
            };
            const newURL = new url_model_1.default(urlObject);
            const savedURL = yield newURL.save();
            res.status(201).json({ "data": savedURL, "statusCode": 201, "errorCode": null, "errorMessage": null });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Error shortening the URL." });
    }
});
exports.default = urlHandler;
