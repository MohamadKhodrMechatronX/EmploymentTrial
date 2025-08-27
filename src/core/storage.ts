import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  ACTIVE_TEAM_ID: "active_team_id",
  ACTIVE_CHANNEL_ID: "active_channel_id",
  USER_FLYOUT: "user_flyout",
} as const;

async function set(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}
async function get(key: string) {
  return (await AsyncStorage.getItem(key)) ?? "";
}
async function del(key: string) {
  await AsyncStorage.removeItem(key);
}

export type UserFlyout = {
  profile_name?: string;
  profile_image_url?: string;
  bio?: string;
  email?: string;
  youtube_urls?: string[];
};

export const storage = {
  getAuthToken: () => get(STORAGE_KEYS.AUTH_TOKEN),
  setAuthToken: (v: string) => set(STORAGE_KEYS.AUTH_TOKEN, v),
  clearAuthToken: () => del(STORAGE_KEYS.AUTH_TOKEN),

  getActiveTeamId: () => get(STORAGE_KEYS.ACTIVE_TEAM_ID),
  setActiveTeamId: (v: string) => set(STORAGE_KEYS.ACTIVE_TEAM_ID, v),
  clearActiveTeamId: () => del(STORAGE_KEYS.ACTIVE_TEAM_ID),

  getActiveChannelId: () => get(STORAGE_KEYS.ACTIVE_CHANNEL_ID),
  setActiveChannelId: (v: string) => set(STORAGE_KEYS.ACTIVE_CHANNEL_ID, v),
  clearActiveChannelId: () => del(STORAGE_KEYS.ACTIVE_CHANNEL_ID),

  getUserFlyout: async (): Promise<UserFlyout | null> => {
    const raw = await get(STORAGE_KEYS.USER_FLYOUT);
    if (!raw) return null;
    try { return JSON.parse(raw) as UserFlyout; } catch { return null; }
  },
  setUserFlyout: async (v: UserFlyout) => set(STORAGE_KEYS.USER_FLYOUT, JSON.stringify(v)),
  clearUserFlyout: () => del(STORAGE_KEYS.USER_FLYOUT),

  clearAllAuthContext: async () => {
    await Promise.all([
      del(STORAGE_KEYS.AUTH_TOKEN),
      del(STORAGE_KEYS.ACTIVE_TEAM_ID),
      del(STORAGE_KEYS.ACTIVE_CHANNEL_ID),
    ]);
  },
};