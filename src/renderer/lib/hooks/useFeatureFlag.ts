import { useFeatureFlagEnabled } from 'posthog-js/react';
import { useFeatureFlagOverrides } from '@renderer/lib/providers/feature-flag-override-context';

/**
 * Returns true when the named PostHog feature flag is enabled for this client.
 * Returns false while flags are loading or when PostHog is not configured.
 *
 * In dev builds, FLAG_<name> env vars (hyphens → underscores) in .env.local
 * take precedence. Example: FLAG_workspace_provider=true enables "workspace-provider".
 * These are read by the main process at runtime and passed over IPC — they are
 * never baked into the renderer bundle.
 */
export function useFeatureFlag(flag: string): boolean {
  const posthogValue = useFeatureFlagEnabled(flag) ?? false;
  const overrides = useFeatureFlagOverrides();
  return flag in overrides ? (overrides[flag] ?? false) : posthogValue;
}
