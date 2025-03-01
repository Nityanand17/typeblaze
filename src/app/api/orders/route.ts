import { connectDb } from '@/dbconfig/dbconfig';
import { getDataFromToken } from '@/lib/getDataFromToken';
import Order from '@/models/order.model';
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,   
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,  
});

export async function POST(request: NextRequest, response: NextResponse)
 {
    try {
        const reqUserId = getDataFromToken(request);
        if (!reqUserId) {
            return NextResponse.json(
                { message: "User not logged in" },
                { status: 401 }
            );
        }

        const { productId, varient } = await request.json();
        if (!productId || !varient) {
            return NextResponse.json(
                { message: "productId and varient are required" },
                { status: 400 }
            );
        }

        await connectDb();

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: 900 * 100, // Convert ₹9 to paisa
            currency: 'INR',
            receipt: `receipt-${Date.now()}`,
            notes: {
                productId: productId.toString(),
                varient,
            },
        });

        // Ensure order was created successfully
        if (!order || !order.id) {
            return NextResponse.json(
                { message: "Failed to create Razorpay order" },
                { status: 500 }
            );
        }

        // Save order in database
        const newOrder = await Order.create({
            userId: reqUserId,
            items: [{
                productId,
                quantity: 1,
            }],
            orderDate: new Date(),
            status: 'pending',
            amount: 9,
            paymentMethod: 'razorpay',
            paymentStatus: 'pending',
            paymentDate: new Date(),
            razorpayOrderId: order.id,
        });

        return NextResponse.json({
            message: "Order created successfully",
            order: newOrder,
            razorpayOrder: {
                id: order.id,
                amount: order.amount,
                currency: order.currency,
            },
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error creating order:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
