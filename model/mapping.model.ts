import mongoose from "mongoose";

const urlMappingSchema = new mongoose.Schema({
    longURL: {type: String, required: true, unique: true},
    uniqueId: {type: Number, required: true, unique: true},
},{
    timestamps: true,
});

const Mapping = mongoose.model("Mapping", urlMappingSchema);

export default Mapping;