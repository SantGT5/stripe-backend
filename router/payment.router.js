require("dotenv").config()

const router = require("express").Router();

const storeItems = require('../items/storeItems')

const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

router.post('/create-checkout-session', async (req, res) => {

  try {
console.log(process.env.SERVER_URL)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data:{
            currency: 'usd',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        }
      }),
      mode: 'payment',
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
    });
  
    res.json({url: session.url})




    
  } catch (err) {
    res.status(500).json({ error: err.message })
  }







});



  module.exports = router;