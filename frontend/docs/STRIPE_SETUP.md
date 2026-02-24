# Stripe Product Setup Guide

This guide walks you through setting up subscription products in your Stripe dashboard for the Pro and Elite tiers.

## Prerequisites

- Access to your Stripe dashboard at https://dashboard.stripe.com
- The Stripe API keys are already configured in your backend:
  - Publishable Key: `pk_test_51SqMs35XIYyFCA6UuZ8GXNAzRZsqbfQp5BF04WIUWga5yUnsQENDd9uMjCN4qf2JxULjQfTkueFMVnyIBQB6GtFo00JaLPSbs1`
  - Secret Key: `sk_test_51SqMs35XIYyFCA6UWJR2oA59uinQ364YwSTGN0nD9K6Fuv5skkELENbTdpqlxeKb9m91nHaZf8DgIN2JMpofVpoh004N8ftZJN`

## Step 1: Create Pro Tier Product

1. Log in to your Stripe dashboard
2. Navigate to **Products** in the left sidebar
3. Click **+ Add product**
4. Fill in the product details:
   - **Name**: `Pro Tier`
   - **Description**: `Monthly subscription for Pro tier with full content generation features`
5. Under **Pricing**:
   - Select **Recurring**
   - Set **Price**: `$29.00 USD`
   - Set **Billing period**: `Monthly`
6. Click **Save product**
7. **Copy the Price ID** (starts with `price_`) - you'll need this for backend integration

## Step 2: Create Elite Tier Product

1. In the Stripe dashboard, navigate to **Products**
2. Click **+ Add product**
3. Fill in the product details:
   - **Name**: `Elite Tier`
   - **Description**: `Monthly subscription for Elite tier with all premium features`
4. Under **Pricing**:
   - Select **Recurring**
   - Set **Price**: `$79.00 USD`
   - Set **Billing period**: `Monthly`
5. Click **Save product**
6. **Copy the Price ID** (starts with `price_`) - you'll need this for backend integration

## Step 3: Update Backend with Price IDs

The backend is already configured with the following Stripe Price IDs:

- **Pro Tier**: `price_1T1UuP5XIYyFCA6UPpQqvD5u`
- **Elite Tier**: `price_1T1Uwp5XIYyFCA6U1p1AUMKk`

These price IDs are hardcoded in the backend's `createStripeCheckoutSession` function in `backend/main.mo`.

**If you created new products with different price IDs**, you will need to update the backend code to use your new price IDs. Contact your backend developer to update these values in the `createStripeCheckoutSession` function.

## Step 4: Configure Webhook (Optional but Recommended)

To automatically update user subscriptions when payments complete:

1. In Stripe dashboard, go to **Developers** → **Webhooks**
2. Click **+ Add endpoint**
3. Set **Endpoint URL** to your canister's webhook endpoint:
   ```
   https://<your-canister-id>.ic0.app/webhook
   ```
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

**Note**: Webhook signature verification is not yet implemented in the backend. For production use, you should implement webhook signature verification to ensure requests are coming from Stripe.

## Step 5: Test the Checkout Flow

1. Log in to your application
2. Navigate to the **Pricing** page
3. Click **Upgrade to Pro** or **Upgrade to Elite**
4. Complete the test checkout using Stripe's test card:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
5. After successful payment, verify:
   - You're redirected to the payment success page
   - Your subscription tier is updated in the dashboard
   - Previously locked features are now accessible

## Troubleshooting

### Checkout session fails to create
- Verify the price IDs in the backend match your Stripe products
- Check that your Stripe API keys are correct
- Ensure your Stripe account is not in restricted mode

### Payment succeeds but tier doesn't update
- Check if webhooks are configured correctly
- Verify the webhook endpoint is accessible
- For now, an admin can manually update user tiers via the backend

### Features still locked after upgrade
- Clear your browser cache and refresh the page
- Log out and log back in to refresh your session
- Check the subscription status in the Subscription Management page

## Production Checklist

Before going live with real payments:

- [ ] Replace test API keys with live API keys
- [ ] Create live products in Stripe (not test mode)
- [ ] Update backend with live price IDs
- [ ] Configure webhook with live endpoint
- [ ] Implement webhook signature verification
- [ ] Test the complete flow with real payment methods
- [ ] Set up Stripe customer portal for subscription management
- [ ] Configure email notifications for successful payments
- [ ] Review Stripe's compliance requirements for your region

## Support

For questions about:
- **Stripe setup**: Visit https://stripe.com/docs
- **Backend integration**: Contact your development team
- **Application issues**: Check the application logs or contact support
