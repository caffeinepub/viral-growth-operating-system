import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type OldTierLevel = {
    #free;
    #pro;
    #elite;
  };

  type OldSubscriptionStatus = {
    #active;
    #cancelled;
    #pending;
  };

  type OldUserSubscription = {
    tier : OldTierLevel;
    status : OldSubscriptionStatus;
  };

  type OldBrandVoiceProfile = {
    personality : Text;
    tone : Text;
    consistency : Text;
  };

  type OldContentGenerationRequest = {
    tone : Text;
    audience : Text;
    platform : Text;
    niche : Text;
    goal : Text;
  };

  type OldUserProfile = {
    name : Text;
    email : Text;
  };

  type OldActor = {
    brandVoiceProfiles : Map.Map<Principal, OldBrandVoiceProfile>;
    contentRequests : Map.Map<Principal, [OldContentGenerationRequest]>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
    userSubscriptions : Map.Map<Principal, OldUserSubscription>;
  };

  type TierLevel = {
    #free;
    #pro;
    #elite;
  };

  type SubscriptionStatus = {
    #active;
    #cancelled;
    #pending;
  };

  type UserSubscription = {
    tier : TierLevel;
    status : SubscriptionStatus;
    customerId : ?Text;
  };

  type BrandVoiceProfile = {
    personality : Text;
    tone : Text;
    consistency : Text;
  };

  type ContentGenerationRequest = {
    tone : Text;
    audience : Text;
    platform : Text;
    niche : Text;
    goal : Text;
  };

  type UserProfile = {
    name : Text;
    email : Text;
  };

  type NewActor = {
    brandVoiceProfiles : Map.Map<Principal, BrandVoiceProfile>;
    contentRequests : Map.Map<Principal, [ContentGenerationRequest]>;
    userProfiles : Map.Map<Principal, UserProfile>;
    userSubscriptions : Map.Map<Principal, UserSubscription>;
  };

  public func run(old : OldActor) : NewActor {
    let newBrandVoiceProfiles = old.brandVoiceProfiles.map<Principal, OldBrandVoiceProfile, BrandVoiceProfile>(
      func(_id, oldProfile) {
        oldProfile;
      }
    );
    let newContentRequests = old.contentRequests.map<Principal, [OldContentGenerationRequest], [ContentGenerationRequest]>(
      func(_id, oldRequests) {
        oldRequests.map<OldContentGenerationRequest, ContentGenerationRequest>(
          func(oldReq) {
            {
              tone = oldReq.tone;
              audience = oldReq.audience;
              platform = oldReq.platform;
              niche = oldReq.niche;
              goal = oldReq.goal;
            };
          }
        );
      }
    );
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, UserProfile>(
      func(_id, oldProfile) {
        oldProfile;
      }
    );
    let newUserSubscriptions = old.userSubscriptions.map<Principal, OldUserSubscription, UserSubscription>(
      func(_id, oldSub) {
        { oldSub with customerId = null };
      }
    );
    {
      brandVoiceProfiles = newBrandVoiceProfiles;
      contentRequests = newContentRequests;
      userProfiles = newUserProfiles;
      userSubscriptions = newUserSubscriptions;
    };
  };
};
