import { connectDb } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Step 1: Extract User ID from Token
        const reqUserId = getDataFromToken(request);
        if (!reqUserId || typeof reqUserId !== "string" || !reqUserId.match(/^[0-9a-fA-F]{24}$/)) {
            return NextResponse.json({ message: "Unauthorized or Invalid user ID format" }, { status: 401 });
        }

        // Step 2: Connect to Database
        await connectDb();

        // Step 3: Fetch User Orders
        const orders = await Order.find({ userId: reqUserId })
            .populate({
                path: "items.productId",
                select: "name price",
                options: { strictPopulate: false }
            })
            .sort({ orderDate: -1 })
            .lean();

        // Step 4: Return Response
        return NextResponse.json({
            message: orders.length > 0 ? "Orders retrieved successfully" : "No orders found",
            orders
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching orders:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        return NextResponse.json({ message: "Internal Server Error", error: errorMessage }, { status: 500 });
    }
}
