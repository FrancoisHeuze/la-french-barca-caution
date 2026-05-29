import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

function checkPassword(request: Request) {
  return request.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD
}

export async function GET(request: Request) {
  if (!checkPassword(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const payments = await stripe.paymentIntents.search({
    query: "metadata['type']:'boat_security_deposit'",
    limit: 50,
  })

  return NextResponse.json({
    payments: payments.data.map((p) => ({
      id: p.id,
      amount: p.amount,
      amount_received: p.amount_received,
      currency: p.currency,
      status: p.status,
      created: p.created,
      customer_name: p.metadata.customer_name || "",
      customer_email: p.metadata.customer_email || "",
    })),
  })
}
