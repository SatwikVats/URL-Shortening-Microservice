import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    longURL: {type: String, required: true},
    shortURL: {type: String, required: true},
    integerId: {type: Number, required: true},
},{
    timestamps: true,
});

urlSchema.index({userId: 1, longURL: 1}, {unique: true});

const URL = mongoose.model("Url", urlSchema);

export default URL;