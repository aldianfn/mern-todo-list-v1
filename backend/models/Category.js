import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    color_code: {
        type: String,
        default: "#000000",
    },
}, {
    timestamps: true    // createdAt and updatedAt
});

const Category = mongoose.model('Category', categorySchema);

export default Category;