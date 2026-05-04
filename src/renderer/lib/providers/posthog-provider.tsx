import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect, type ReactNode } from 'react';
import { rpc } from '@renderer/lib/ipc';

export function PostHogFeatureFlagsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    rpc.telemetry
      .getConfig()
      .then(({ apiKey, apiHost }) => {
        if (apiKey && apiHost) {
          posthog.init(apiKey, {
            api_host: apiHost,
            capture_pageview: false,
            disable_session_recording: true,
            autocapture: false,
          });
        }
      })
      .catch(() => {});

    rpc.telemetry
      .getStatus()
      .then(({ status }) => {
        if (status?.instance_id) posthog.identify(status.instance_id);
      })
      .catch(() => {});
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
