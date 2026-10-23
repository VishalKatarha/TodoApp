import connectDB from "@/app/libs/db";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function POST(request) {
    
  try {
    const { title, description } = await request.json();

    console.log("Received data:", { title, description });

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and description are required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const newTodo = await Todo.create({
      title,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Todo created successfully!",
        data: newTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();

    const todos = await Todo.find();

    return NextResponse.json(
      {
        success: true,
        message: "Todos retrieved successfully!",
        data: todos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET API route:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching todos.",
      },
      { status: 500 }
    );
  }
}
