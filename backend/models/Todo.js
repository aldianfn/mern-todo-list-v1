import mongoose, { mongo } from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['todo', 'doing', 'done'],
        default: 'todo',
    },
    dueDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true    // createdAt and updatedAt
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;