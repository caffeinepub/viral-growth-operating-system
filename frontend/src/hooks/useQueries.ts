import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import {
  TierLevel,
  SubscriptionStatus,
  type UserProfile,
  type BrandVoiceProfile,
  type ContentGenerationRequest,
  type FeatureSet,
  type UserSubscription,
  type StripeSessionStatus,
} from '../backend';
import type { Principal } from '@dfinity/principal';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

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

export function useCheckUserTier() {
  const { actor, isFetching } = useActor();

  return useQuery<FeatureSet>({
    queryKey: ['featureSet'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.checkUserTier();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

export function useGetMySubscription() {
  const { actor, isFetching } = useActor();

  return useQuery<UserSubscription | null>({
    queryKey: ['subscription'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMySubscription();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
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
      if (!actor) throw new Error('Actor not available');
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: { secretKey: string; allowedCountries: string[] }) => {
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
    mutationFn: async ({
      tier,
      successUrl,
      cancelUrl,
    }: {
      tier: TierLevel;
      successUrl: string;
      cancelUrl: string;
    }): Promise<CheckoutSession> => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.createStripeCheckoutSession(tier, successUrl, cancelUrl);
      const session = JSON.parse(result) as CheckoutSession;
      if (!session?.url) {
        throw new Error('Stripe session missing url');
      }
      return session;
    },
  });
}

export function useGetStripeSessionStatus() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (sessionId: string): Promise<StripeSessionStatus> => {
      if (!actor) throw new Error('Actor not available');
      return actor.getStripeSessionStatus(sessionId);
    },
  });
}

export function useGetBrandVoiceProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<BrandVoiceProfile | null>({
    queryKey: ['brandVoice'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBrandVoiceProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetBrandVoiceProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: BrandVoiceProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setBrandVoiceProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brandVoice'] });
    },
  });
}

export function useGetContentRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<ContentGenerationRequest[]>({
    queryKey: ['contentRequests'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
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

export function useGenerateHooks() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (request: ContentGenerationRequest): Promise<string[]> => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateHooks(request);
    },
  });
}

export function useGenerateScripts() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (request: ContentGenerationRequest): Promise<string[]> => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateScripts(request);
    },
  });
}

export function useGenerateCaptions() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (request: ContentGenerationRequest): Promise<string[]> => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateCaptions(request);
    },
  });
}

export function useGenerateCalendar() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (request: ContentGenerationRequest): Promise<string> => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateCalendar(request);
    },
  });
}

export function useSetUserSubscription() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      user,
      tier,
      status,
    }: {
      user: Principal;
      tier: TierLevel;
      status: SubscriptionStatus;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setUserSubscription(user, tier, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      queryClient.invalidateQueries({ queryKey: ['featureSet'] });
    },
  });
}

export function useProcessSubscriptionUpgrade() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, newTier }: { user: Principal; newTier: TierLevel }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.processSubscriptionUpgrade(user, newTier);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      queryClient.invalidateQueries({ queryKey: ['featureSet'] });
    },
  });
}
