import { Handler } from '@netlify/functions'
import Stripe from 'stripe'

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Stripe secret key is not configured' }),
      }
    }

    const stripe = new Stripe(stripeSecretKey)

    const { amount, currency = 'gbp', metadata = {} } = JSON.parse(event.body || '{}')

    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid amount' }),
      }
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents/pence
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    }
  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Failed to create payment intent',
      }),
    }
  }
}

export { handler }
