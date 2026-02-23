import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FeatureSet {
    roadmap: boolean;
    facelessVersion: boolean;
    hashtags: boolean;
    hooks: boolean;
    scripts: boolean;
    affiliateSuggestions: boolean;
    contentScore: boolean;
    calendar: boolean;
    captions: boolean;
    monetizationAngles: bigint;
}
export interface ContentGenerationRequest {
    goal: string;
    tone: string;
    audience: string;
    platform: string;
    niche: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface BrandVoiceProfile {
    personality: string;
    tone: string;
    consistency: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface UserSubscription {
    status: SubscriptionStatus;
    tier: TierLevel;
}
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum SubscriptionStatus {
    active = "active",
    cancelled = "cancelled",
    pending = "pending"
}
export enum TierLevel {
    pro = "pro",
    free = "free",
    elite = "elite"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addContentRequest(request: ContentGenerationRequest): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkUserTier(): Promise<FeatureSet>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    generateCalendar(request: ContentGenerationRequest): Promise<string>;
    generateCaptions(request: ContentGenerationRequest): Promise<Array<string>>;
    generateHooks(request: ContentGenerationRequest): Promise<Array<string>>;
    generateScripts(request: ContentGenerationRequest): Promise<Array<string>>;
    getBrandVoiceProfile(): Promise<BrandVoiceProfile | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContentRequests(): Promise<Array<ContentGenerationRequest>>;
    getMySubscription(): Promise<UserSubscription | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    processSubscriptionUpgrade(user: Principal, newTier: TierLevel): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setBrandVoiceProfile(profile: BrandVoiceProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    setUserSubscription(user: Principal, tier: TierLevel, status: SubscriptionStatus): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
