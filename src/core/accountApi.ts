import { api } from "./http";

export async function getAccountInfo(): Promise<any> {
  const res = await api.get("/api/v2/account");
  return res.data;
}