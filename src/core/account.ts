import { useEffect, useState } from "react";
import { getAccountInfo } from "./accountApi";
import { storage, UserFlyout } from "./storage";

type UseAccountState = {
  account: any | null;
  loading: boolean;
  error: unknown;
};

export async function bootstrapFromAccountJson(account: any) {
  const teamId = String(account?.teams?.[0]?.id ?? "");
  const channelId =
    String(account?.teams?.[0]?.team_accounts?.[0]?.channel_id ?? "") ||
    (account?.youtube_urls?.[0] ?? "");

  if (teamId) await storage.setActiveTeamId(teamId);
  if (channelId) await storage.setActiveChannelId(channelId);

  const flyout: UserFlyout = {
    profile_name: account?.profile_name ?? "",
    profile_image_url: account?.profile_image_url ?? "",
    bio: account?.bio ?? "",
    email: account?.email ?? "",
    youtube_urls: Array.isArray(account?.youtube_urls)
      ? account.youtube_urls
      : undefined,
  };
  await storage.setUserFlyout(flyout);
}

export async function clearAuthContext() {
  await storage.clearAllAuthContext();
}

export function useAccount(): UseAccountState {
  const [account, setAccount] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getAccountInfo();
        if (mounted) setAccount(data);
      } catch (e) {
        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { account, loading, error };
}