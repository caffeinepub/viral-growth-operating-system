# Specification

## Summary
**Goal:** Fix the "Canister ID Not Resolved" (Error 400) on the ICP0.io gateway so the Viral Growth OS frontend loads correctly at its canister URL.

**Planned changes:**
- Update `index.html` and/or the frontend build configuration to correctly embed or reference the canister ID (`xzgjg-tiaaa-aaaal-qndgq-cai`) so the ICP0.io gateway can resolve the destination canister.
- Verify and correct `dfx.json` to ensure the frontend asset canister is properly declared with the correct canister ID binding and source directories for IC mainnet deployment.

**User-visible outcome:** Navigating to `https://xzgjg-tiaaa-aaaal-qndgq-cai.icp0.io` loads the app without a 400 error.
