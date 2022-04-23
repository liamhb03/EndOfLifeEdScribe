$(document).ready(function () {
  const publishableKey = 'pk_live_51JRlo2EvZDX7pCaJAi9IxSClpSYiApEOBAShnow2Ox5lA8ITEJOqZdHZRsGiMIRtrF2KU7gvXs5JKT24d43fmXGQ00X3rkUeKv'

  const stripe = Stripe(
    publishableKey)
  const checkoutButton = $('#checkout-button')
  const manageBillingButton = $('#manage-billing-button')

  checkoutButton.click(function () {
    const product = $("#checkout-button").val()

    fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'email': customer.email
      },
      body: JSON.stringify({
        product,
        customerID: customer.billingID
      })
    })
      .then((result) => result.json())
      .then(({ sessionId }) => stripe.redirectToCheckout({ sessionId }))
  })

  manageBillingButton.click(function () {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        email: customer.email
      },
      body: JSON.stringify({
        customer: customer.billingID
      })
    }

    fetch('/billing', requestOptions)
      .then((response) => response.json())
      .then((result) => window.location.replace(result.url))
      .catch((error) => console.log('error', error))
  })
})
