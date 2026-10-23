
import Todo from "@/models/Todo";
import connectDB from "@/app/libs/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";




// GET: Fetch single Todo
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid Todo ID" },
        { status: 400 }
      );
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return NextResponse.json(
        { message: "Todo not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


// PUT: Update Todo
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { title, description } = await request.json();

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid Todo ID" },
        { status: 400 }
      );
    }

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        { message: "Title and description are required." },
        { status: 400 }
      );
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return NextResponse.json(
        { message: "Todo not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Todo updated successfully!",
        todo: updatedTodo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT error:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}



// DELETE: Delete Todo
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid Todo ID" },
        { status: 400 }
      );
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return NextResponse.json(
        { message: "Todo not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Todo deleted successfully!",
        todo: deletedTodo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
