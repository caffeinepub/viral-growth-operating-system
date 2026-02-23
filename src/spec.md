# Specification

## Summary
**Goal:** Configure Stripe products and integrate real price IDs into the checkout flow to enable Pro and Elite subscription purchases.

**Planned changes:**
- Create two Stripe subscription products (Pro Tier and Elite Tier) in Stripe dashboard with monthly recurring prices
- Update backend createStripeCheckoutSession function to map Pro and Elite tiers to their respective Stripe price IDs
- Verify webhook handler correctly processes checkout.session.completed events and upgrades user tier based on price ID
- Test end-to-end subscription flow from pricing page through checkout to feature access

**User-visible outcome:** Users can purchase Pro or Elite subscriptions through Stripe checkout, and their subscription tier is automatically upgraded after payment, unlocking premium features in the dashboard and content generator.
