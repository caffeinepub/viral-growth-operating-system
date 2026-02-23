import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, UserSubscription, FeatureSet, ContentGenerationRequest, TierLevel, ShoppingItem, StripeConfiguration } from '../backend';
import { toast } from 'sonner';

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetMySubscription() {
  const { actor, isFetching } = useActor();

  return useQuery<UserSubscription | null>({
    queryKey: ['subscription'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMySubscription();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0, // Always refetch to get latest subscription status
  });
}

export function useCheckUserTier() {
  const { actor, isFetching } = useActor();

  return useQuery<FeatureSet>({
    queryKey: ['featureSet'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.checkUserTier();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0, // Always refetch to get latest feature access
  });
}

export function useGetContentRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<ContentGenerationRequest[]>({
    queryKey: ['contentRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContentRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddContentRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: ContentGenerationRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addContentRequest(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentRequests'] });
    },
  });
}

export function useGenerateContent() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (request: ContentGenerationRequest) => {
      if (!actor) throw new Error('Actor not available');

      // Call all generation methods
      const [hooks, scripts, captions] = await Promise.all([
        actor.generateHooks(request),
        actor.generateScripts(request),
        actor.generateCaptions(request),
      ]);

      // Mock data for demonstration (backend returns empty arrays)
      return {
        hooks: hooks.length > 0 ? hooks : [
          "Stop scrolling if you're tired of being broke",
          "This one trick changed my entire content strategy",
          "Nobody talks about this side of content creation",
        ],
        scripts: scripts.length > 0 ? scripts : [
          "Let me tell you something nobody wants to admit about going viral. It's not about luck. It's about understanding the algorithm's psychology. Here's what I learned after 1000 posts...",
          "You know what separates successful creators from everyone else? It's not talent. It's not equipment. It's this one simple framework that I'm about to share with you...",
          "I spent 6 months studying viral content and discovered a pattern that nobody talks about. Once you see it, you can't unsee it. Here's the breakdown...",
        ],
        captions: captions.length > 0 ? captions : [
          "The algorithm doesn't reward perfection. It rewards consistency. Drop a 🔥 if you're ready to commit.",
          "This is your sign to stop overthinking and start creating. Tag someone who needs to see this.",
          "Save this for when you need motivation. Your breakthrough is closer than you think.",
          "Comment 'YES' if you want more content like this. Let's grow together.",
          "The best time to start was yesterday. The second best time is now. Who's with me?",
        ],
        hashtags: [
          "#contentcreator #viral #socialmediatips #growthhacks #algorithm",
          "#contentmarketing #digitalmarketing #creatoreconomy #viralcontent #engagement",
          "#socialmedia #contentcreation #marketingstrategy #growyouraudience #trending",
          "#creator #influencer #contentstrategy #socialmediamarketing #viralvideos",
          "#contentcreators #digitalcreator #socialmediatips #algorithmhack #growth",
        ],
        monetizationAngles: [
          "Create a mini-course teaching your content strategy framework. Price it at $27-47 for quick conversions. Use your viral content as lead magnets to drive traffic to a landing page.",
        ],
        psychTriggers: "Curiosity gap, social proof, fear of missing out (FOMO), authority positioning, pattern interruption, and aspirational identity.",
        postingRecommendation: "Post 1-2 times daily during peak engagement hours (7-9 AM and 6-9 PM in your audience's timezone). Maintain consistency over intensity.",
        painPoints: [
          "Struggling to get views despite posting regularly",
          "Unsure what content will resonate with their audience",
          "Feeling overwhelmed by algorithm changes",
          "Difficulty monetizing their content effectively",
          "Lack of a clear content strategy or roadmap",
        ],
        scores: {
          hookStrength: 8,
          retentionPotential: 7,
          monetizationPotential: 9,
          viralityExplanation: "Strong hooks with curiosity gaps and pattern interrupts. Scripts leverage storytelling and authority. High monetization potential through educational positioning. Recommended improvements: Add more specific data points and personal transformation stories for increased retention.",
        },
      };
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stripeConfigured'] });
    },
  });
}

export type CheckoutSession = {
  id: string;
  url: string;
};

export function useCreateStripeCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (tier: TierLevel): Promise<CheckoutSession> => {
      if (!actor) throw new Error('Actor not available');

      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;

      // Call the backend with tier parameter
      const result = await actor.createStripeCheckoutSession(tier, successUrl, cancelUrl);
      
      // JSON parsing is critical for Stripe integration
      const session = JSON.parse(result) as CheckoutSession;
      
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }
      
      return session;
    },
  });
}
