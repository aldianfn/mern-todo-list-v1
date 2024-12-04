import Todo from "../models/Todo.js";

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        console.log("Error in fetching todos: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        res.status(200).json({ success: true, data: todo });
    } catch (error) {
        console.error("Error in fetching todo: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createTodo = async (req, res) => {
    const todo = req.body;

    if(!todo.title || !todo.dueDate) {
        return res.status(400).json({ success: false, message: "Please provide title and due date fields" });
    }

    const newTodo = new Todo(todo);

    try {
        await newTodo.save();
        res.status(201).json({ success: true, data: newTodo })
    } catch (error) {
        console.error("Error in creating todo: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateTodo = async(req, res) => {
    const { id } = req.params;
    const todo = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message:"Todo not found" });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
        res.status(200).json({ success: true, data: updatedTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    
    try {
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Todo deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Todo not found" });
    }
}