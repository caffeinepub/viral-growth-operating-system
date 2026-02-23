import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Subscription types
  public type TierLevel = {
    #free;
    #pro;
    #elite;
  };

  public type SubscriptionStatus = {
    #active;
    #cancelled;
    #pending;
  };

  public type UserSubscription = {
    tier : TierLevel;
    status : SubscriptionStatus;
  };

  public type FeatureSet = {
    hooks : Bool;
    scripts : Bool;
    captions : Bool;
    hashtags : Bool;
    monetizationAngles : Nat;
    contentScore : Bool;
    calendar : Bool;
    roadmap : Bool;
    affiliateSuggestions : Bool;
    facelessVersion : Bool;
  };

  public type ContentGenerationRequest = {
    tone : Text;
    audience : Text;
    platform : Text;
    niche : Text;
    goal : Text;
  };

  public type ContentOutput = {
    hooks : [Text];
    scripts : [Text];
    captions : [Text];
    hashtags : [Text];
    monetizationAngles : [Text];
    psychTriggers : Text;
    postingRecommendation : Text;
    painPoints : [Text];
    scores : {
      hookStrength : Nat;
      retentionPotential : Nat;
      monetizationPotential : Nat;
      viralityExplanation : Text;
    };
  };

  public type BrandVoiceProfile = {
    personality : Text;
    tone : Text;
    consistency : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userSubscriptions = Map.empty<Principal, UserSubscription>();
  let brandVoiceProfiles = Map.empty<Principal, BrandVoiceProfile>();
  let contentRequests = Map.empty<Principal, [ContentGenerationRequest]>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // User Profile Management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func checkUserTier() : async FeatureSet {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check tier");
    };

    switch (userSubscriptions.get(caller)) {
      case (null) {
        return {
          hooks = true;
          scripts = false;
          captions = false;
          hashtags = false;
          monetizationAngles = 0;
          contentScore = false;
          calendar = false;
          roadmap = false;
          affiliateSuggestions = false;
          facelessVersion = false;
        };
      };
      case (?subscription) {
        switch (subscription.tier) {
          case (#free) {
            return {
              hooks = true;
              scripts = false;
              captions = false;
              hashtags = false;
              monetizationAngles = 0;
              contentScore = false;
              calendar = false;
              roadmap = false;
              affiliateSuggestions = false;
              facelessVersion = false;
            };
          };
          case (#pro) {
            return {
              hooks = true;
              scripts = true;
              captions = true;
              hashtags = true;
              monetizationAngles = 1;
              contentScore = true;
              calendar = false;
              roadmap = false;
              affiliateSuggestions = true;
              facelessVersion = false;
            };
          };
          case (#elite) {
            return {
              hooks = true;
              scripts = true;
              captions = true;
              hashtags = true;
              monetizationAngles = 2;
              contentScore = true;
              calendar = true;
              roadmap = true;
              affiliateSuggestions = true;
              facelessVersion = true;
            };
          };
        };
      };
    };
  };

  public shared ({ caller }) func setUserSubscription(user : Principal, tier : TierLevel, status : SubscriptionStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set user subscriptions");
    };
    userSubscriptions.add(
      user,
      { tier; status },
    );
  };

  public query ({ caller }) func getMySubscription() : async ?UserSubscription {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check subscription");
    };
    userSubscriptions.get(caller);
  };

  public query ({ caller }) func getBrandVoiceProfile() : async ?BrandVoiceProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access brand voice profiles");
    };
    brandVoiceProfiles.get(caller);
  };

  public shared ({ caller }) func setBrandVoiceProfile(profile : BrandVoiceProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set brand voice profiles");
    };
    brandVoiceProfiles.add(caller, profile);
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set Stripe config");
    };
    stripeConfig := ?config;
  };

  public shared ({ caller }) func processSubscriptionUpgrade(user : Principal, newTier : TierLevel) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can process subscription upgrades");
    };
    let status : SubscriptionStatus = #active;
    userSubscriptions.add(user, { tier = newTier; status });
  };

  public query ({ caller }) func getContentRequests() : async [ContentGenerationRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access content requests");
    };
    switch (contentRequests.get(caller)) {
      case (null) { [] };
      case (?requests) { requests };
    };
  };

  public shared ({ caller }) func addContentRequest(request : ContentGenerationRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add content requests");
    };
    let existingRequests = switch (contentRequests.get(caller)) {
      case (null) { [] };
      case (?requests) { requests };
    };
    let newRequests = existingRequests.concat([request]);
    contentRequests.add(caller, newRequests);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?config) {
        await Stripe.getSessionStatus(config, sessionId, transform);
      };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?config) {
        await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
      };
    };
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  private func hasFeatureAccess(caller : Principal, feature : Text) : Bool {
    switch (userSubscriptions.get(caller)) {
      case (null) {
        feature == "hooks";
      };
      case (?subscription) {
        switch (subscription.tier) {
          case (#free) { feature == "hooks" };
          case (#pro) {
            feature == "hooks" or feature == "scripts" or feature == "captions" or
            feature == "hashtags" or feature == "contentScore" or feature == "affiliateSuggestions";
          };
          case (#elite) { true };
        };
      };
    };
  };

  public shared ({ caller }) func generateHooks(request : ContentGenerationRequest) : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate content");
    };
    if (not hasFeatureAccess(caller, "hooks")) {
      Runtime.trap("Unauthorized: Your subscription tier does not include this feature");
    };
    [];
  };

  public shared ({ caller }) func generateScripts(request : ContentGenerationRequest) : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate content");
    };
    if (not hasFeatureAccess(caller, "scripts")) {
      Runtime.trap("Unauthorized: Your subscription tier does not include scripts");
    };
    [];
  };

  public shared ({ caller }) func generateCaptions(request : ContentGenerationRequest) : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate content");
    };
    if (not hasFeatureAccess(caller, "captions")) {
      Runtime.trap("Unauthorized: Your subscription tier does not include captions");
    };
    [];
  };

  public shared ({ caller }) func generateCalendar(request : ContentGenerationRequest) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate content");
    };
    if (not hasFeatureAccess(caller, "calendar")) {
      Runtime.trap("Unauthorized: Only Elite tier has access to calendar generation");
    };
    "";
  };
};
