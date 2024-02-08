import { headers } from "next/headers";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE);

export async function POST(request: Request) {
  const body = await request.text();

  const signature = headers().get("stripe-signature");

  //maybe we can use generics to type this object
  const event = stripe.webhooks.constructEvent(body, signature, process.env.WEBHOOK_SECRET);

  console.log("event text", event)

  return Response.json({ body })
}