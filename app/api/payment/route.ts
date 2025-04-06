import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET!,
  });

  const options = {
    amount: body.amount * 100, // in paise
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  try {
    const order = await instance.orders.create(options);
    return NextResponse.json({ success: true, order });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
