import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { rpc } from '@renderer/lib/ipc';

const FeatureFlagOverrideContext = createContext<Record<string, boolean>>({});

export function FeatureFlagOverrideProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    rpc.telemetry
      .getDevFlagOverrides()
      .then(setOverrides)
      .catch(() => {});
  }, []);

  return <FeatureFlagOverrideContext value={overrides}>{children}</FeatureFlagOverrideContext>;
}

export function useFeatureFlagOverrides(): Record<string, boolean> {
  return useContext(FeatureFlagOverrideContext);
}
