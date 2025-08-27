export const AUTH_HEADER_NAME = "auth_token";
export const TEAM_HEADER_NAME = "active_team_id";
export const CHANNEL_HEADER_NAME = "active_channel_id";

export const DEFAULT_TEAM_ID = "";
export const DEFAULT_CHANNEL_ID = "";

export const API_BASE_URL = "https://api.hellothematic.com";

export const API_V2 = "/api/v2";

export const endpoints = {
  project: (projectId: string | number) => `${API_V2}/projects/${projectId}`,
  projectSongs: (projectId: string | number) => `${API_V2}/projects/${projectId}/songs`,
  projectPickups: (projectId: string | number) => `${API_V2}/projects/${projectId}/pickups`,
};