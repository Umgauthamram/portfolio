import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { message: "Please fill out all fields." },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const newMessage = await Message.create({ name, email, message });

        return NextResponse.json(
            { message: "Message sent successfully!", data: newMessage },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectToDatabase();

        // Fetch all messages sorted by newest first
        const messages = await Message.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ data: messages }, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
