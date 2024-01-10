import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    // userId: {type: String, required: true},
    longURL: {type: String, required: true, unique: true},
    shortURL: {type: String, required: true, unique: true},
    integerId: {type: Number, required: true, unique: true},
},{
    timestamps: true,
});

const URL = mongoose.model("Url", urlSchema);

export default URL;