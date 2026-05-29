import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

function checkPassword(request: Request) {
  return request.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD
}

export async function POST(request: Request) {
  if (!checkPassword(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { paymentIntentId } = await request.json()
  const result = await stripe.paymentIntents.capture(paymentIntentId)

  return NextResponse.json({ success: true, result })
}
