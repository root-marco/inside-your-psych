import mongoose from "mongoose";

const Comment = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    pageSlug:{
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    }
})
/* {
    timestamps: {
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
}); */

const comment = mongoose.model('comment', Comment);
export default comment;