import mongoose, { now } from "mongoose";

const Comment = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
},
{
    timestamps: {
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
})