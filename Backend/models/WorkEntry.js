import { Schema, model } from "mongoose";
// models/WorkEntry.js
const workSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },      
    description: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },     
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Work = model("Work",workSchema)
export default Work