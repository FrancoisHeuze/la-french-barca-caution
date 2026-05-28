import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const amountInEuros = Number(body.amount)
    const amountInCents = Math.round(amountInEuros * 100)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      payment_intent_data: {
        capture_method: "manual",
        metadata: {
          type: "boat_security_deposit",
          customer_name: body.name || "",
          customer_email: body.email || "",
        },
      },
      customer_email: body.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Caution bateau - La French Barca",
              description:
                "Empreinte bancaire de caution. Aucun débit sauf dommage ou frais prévus au contrat.",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_BASE_URL}/`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur Stripe" },
      { status: 500 }
    )
  }
}
