import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    location: {type: String},
    userAgent: {type: String},
},{
    timestamps: true,
})

const analyticsSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    longURL: {type: String, required: true},
    shortURL: {type: String, required: true},
    totalClicks: {type: Number, required: true},
    click: [clickSchema],
},{
    timestamps: true,
});

analyticsSchema.index({userId: 1, longURL: 1}, {unique: true});

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;