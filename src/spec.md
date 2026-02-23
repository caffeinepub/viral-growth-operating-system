# Specification

## Summary
**Goal:** Configure Stripe API keys in the backend and update the frontend to display confirmation when Stripe is configured.

**Planned changes:**
- Store Stripe publishable and secret keys in the backend using the existing setStripeConfig function
- Update the StripeSetup page to detect existing Stripe configuration and display confirmation message with the publishable key
- Add visual confirmation that payment integration is active
- Allow updating the configuration if needed

**User-visible outcome:** Users will see automatic confirmation on the StripeSetup page that Stripe is configured, showing the publishable key in use, and will be able to update the configuration if needed.
