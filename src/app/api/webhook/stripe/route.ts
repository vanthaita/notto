import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from 'stripe'
export async function POST(req: Request) {
    const body = await req.text();
    const signture = headers().get('Stripe-Signature');

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signture as string, 
            process.env.STRIPE_WEBHOOK_SECRET as string
        )


    } catch(err) {
        return new Response('webhook error', {
            status: 400,
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );
        const customerId = String(session.customer);

        const user = await prisma.user.findUnique({
            where: {
                stripeCustomerId: customerId
            }
        })

        if(!user) {
            throw new Error('User not found...');
        }

        await prisma.subscription.create({
            data: {
                stripeSubscriptionId: subscription.id,
                userId: user.id,
                currentPeriodStart: subscription.current_period_start,
                currentPeriodSEnd: subscription.current_period_end,
                status: subscription.status,
                planId: subscription.items.data[0].plan.id,
                invterval: String(subscription.items.data[0].plan.interval)
            }
        })
    }

    if(event.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );

        await prisma.subscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                planId: subscription.items.data[0].price.id,
                currentPeriodStart: subscription.current_period_start,
                currentPeriodSEnd: subscription.current_period_end,
                status: subscription.status,
            }
        })
    }


    return new Response(null, {
        status: 200,
    });
}