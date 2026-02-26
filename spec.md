# Specification

## Summary
**Goal:** Integrate Internet Identity authentication so customers can create accounts, set up profiles, and have their preferences and data saved on the backend.

**Planned changes:**
- Add a "Sign In" button in the header (via the `Layout` component) for unauthenticated users, and a "Sign Out" button for authenticated users, using the existing `useInternetIdentity` hook
- On first login, automatically show the `ProfileSetupModal` to collect the user's name and email, saving it via `useSaveCallerUserProfile`; skip the modal on subsequent logins if a profile already exists
- Initialize the backend actor with the authenticated Internet Identity principal so all backend calls (profile, subscription, content history) are scoped to the logged-in user; fall back to anonymous actor when no identity is available
- After completing profile setup, redirect the user to `/dashboard`; the hero section CTA directs authenticated users to `/generate` and unauthenticated users to `/pricing`

**User-visible outcome:** Visitors can sign in with Internet Identity, set up their profile on first login, and are taken to a personalized dashboard showing their subscription tier and content history. Returning users are signed in directly without seeing the setup modal again.
