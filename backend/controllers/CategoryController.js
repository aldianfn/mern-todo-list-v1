import mongoose from "mongoose";
import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        console.log("Error in fetching categories: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        console.error("Error in fetching category: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createCategory = async (req, res) => {
    const category = req.body;

    if(!category.category) {
        return res.status(400).json({ success: false, message: "Please provide category name" });
    }

    const newCategory = new Category(category);

    try {
        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory })
    } catch (error) {
        console.error("Error in creating category: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateCategory = async(req, res) => {
    const { id } = req.params;
    const category = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Category not found" });
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, category, { new: true });
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Category not found" });
    }
    
    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }
}