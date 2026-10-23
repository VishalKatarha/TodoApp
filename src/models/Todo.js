import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
   
}, { timestamps: true });

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo; 